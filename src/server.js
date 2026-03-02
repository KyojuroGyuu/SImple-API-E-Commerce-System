import express from 'express';
import 'dotenv/config';
import serverless from 'serverless-http';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   return res.json({status: "API is running"})
})

app.use('/page', userRoutes, shopRoutes, orderRoutes);

export default serverless(app);