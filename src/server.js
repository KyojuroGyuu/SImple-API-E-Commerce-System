import express from 'express';
import 'dotenv/config';
import orderRoutes from './routes/orderRoutes.js';
import userRoutes from './routes/userRoutes.js';
import shopRoutes from './routes/shopRoutes.js';
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
   return res.json({status: "API is running"})
})

app.use('/page', userRoutes, shopRoutes, orderRoutes);

app.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});