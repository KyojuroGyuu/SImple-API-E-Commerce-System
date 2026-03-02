import jwt from 'jsonwebtoken';

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const isSeller = (req, res, next) => {
    if (req.user.role !== 'seller') {
        return res.status(400).json({message: "Only seller can add product"})
    }
    next();
}