import db from '../mysql/mysql.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { registerValidate } from '../utils/validation.js';

export const registerUser = async (req, res) => {
    const {error} = registerValidate(req.body);
    if (error) return res.status(401).json({message: error.details[0].message})
    const {username, email, password, balance, address} = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const users = await db.query('INSERT INTO users (username, email, password, balance, address) VALUES (?, ?, ?, ?, ?)', [username, email, hashedPassword, balance, address]);

        res.status(200).json({
            message: "User registered successfully",
            data: {
                username: users.username,
                email: users.email,
                password: users.password,
                balance: users.balance,
                address: users.address,
                createdAt: new Date()
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const loginUser = async (req, res) => {
    const {email, password} = req.body;

    try {
        const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        if (rows.length === 0) {
            return res.status(404).json({message: "User not found"})
        }

        const user = rows[0];
        const verified = await bcrypt.compare(password, user.password);
        if (!verified) {
            return res.status(400).json({message: "Password is wrong"})
        }

        const token = jwt.sign(
            {id: user.id, username: user.username, email: user.email, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: '7d'}
        )

        res.status(200).json({
            message: "Login success",
            data: {
                user: user.username,
                email: user.email,
                role: user.role,
                token: token
            }
        })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}

export const updateUserBalance = async (req, res) => {
    const {balance} = req.body;
    const id = req.user.id;
    
    try {
        const [result] = await db.query('UPDATE users SET balance = ? WHERE id = ?',[balance, id])

        res.status(201).json({message: "Your balance has been increased", data: result})
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
}
