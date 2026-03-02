import db from '../mysql/mysql.js';

export const newOrder = async (req, res) => {
    const {product_id, quantity} = req.body;
    const user_id = req.user.id;

    try {
        const [products] = await db.query('SELECT * FROM products WHERE id = ?', [product_id])

        if (products.length === 0) {
            return res.status(404).json({message: "Product not found"})
        }
        const product = products[0];

        if (quantity > product.stock) {
            return res.status(400).json({message: "Sorry not enough stock"})
        }

        if (user_id === product.seller_id) {
            return res.status(400).json({message: "You cannot buy your own product"})
        }

        const totalPrice = product.price * quantity;
        const [users] = await db.query('SELECT balance FROM users WHERE id = ?', [user_id])
        const user = users[0];

        if (user.balance < totalPrice) {
            return res.status(400).json({message: "Sorry, you dont have enough balance"})
        }

        await db.query('UPDATE users SET balance = balance - ? WHERE id = ?', [totalPrice, user_id])
        await db.query('UPDATE products SET stock = stock - ? WHERE id = ?',[quantity, product_id])

        const [orders] = await db.query(`INSERT INTO orders (user_id, product_id, quantity, total_price, status) VALUES (?, ?, ?, ?, 'pending')`, [user_id, product_id, quantity, totalPrice])

        const orderId = orders.insertId;
        setTimeout(async () => {
            await db.query(`UPDATE orders SET status = 'success' WHERE id = ?`, [orderId]);
            console.log(`Order ${orderId} status updated to success`);
        }, 10000);

        res.status(201).json({
            message: "Order complete, please wait", 
            data: {
                id: orderId,
                userId: user_id,
                product: product_id,
                name: product.name,
                price: product.price,
                quantity: quantity,
                totalPrice: totalPrice,
                createdAt: new Date()
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}