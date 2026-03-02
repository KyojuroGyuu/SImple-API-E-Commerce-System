import db from '../mysql/mysql.js';

export const newShop = async (req, res) => {
    const {shopName} = req.body;
    const userLog = req.user.id;
    const userRole = req.user.role;

    try {
        if (userRole !== 'seller') {
            return res.status(401).json({message: "You are not seller, cannot set a shop name"})
        }
        
        const seller = await db.query('UPDATE users SET shopName = ? WHERE id = ?', [shopName, userLog])
        
        res.status(200).json({
            message: "Shop name set successfully",
            data: {
                user: seller,
                shopName: shopName,
                updatedAt: new Date(),
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const addProduct = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const seller_id = req.user.id;

    try {

        await db.query('INSERT INTO products (seller_id, name, description, price, stock) VALUES (?, ?, ?, ?, ?)', [seller_id, name, description, price, stock]);

        res.status(200).json({
            message: "New product has been added",
            data: {
                sellerId: seller_id,
                name: name,
                description: description,
                price: price,
                stock: stock,
                createdAt: new Date()
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateProducts = async (req, res) => {
    const {name, description, price, stock} = req.body;
    const {id} = req.params;
    const seller_id = req.user.id;

    try {
        const [product] = await db.query('UPDATE products SET name = ?, description = ?, price = ?, stock = ? WHERE id = ? AND seller_id = ?', [name, description, price, stock, id, seller_id]);

        if (product.affectedRows === 0) {
            return res.status(404).json({message: "Product not found"})
        }

        res.status(200).json({
            message: "Product update completed",
            data: {
                id: id,
                sellerId: seller_id,
                name: name,
                description: description,
                price: price,
                stock: stock,
                updatedAt: new Date()
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const deleteProducts =  async (req, res) => {
    const {id} = req.body;
    const seller_id = req.user.id;

    try {
        const [product] = await db.query('DELETE FROM products WHERE id = ? AND seller_id = ?',[id, seller_id]);

        if (product.affectedRows === 0) {
            return res.status(404).json({message: "Product not found"})
        }

        res.status(200).json({
            message: "Product has been deleted successfully",
            data: product
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const getProducts = async (req, res) => {
    const seller_id = req.user.id;

    try {
        const [rows] = await db.query('SELECT * FROM products WHERE seller_id = ?', [seller_id])

        res.status(200).json(rows)
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}