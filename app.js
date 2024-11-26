const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')
// Importare userRoutes e orderRoutes analogamente.

dotenv.config();

const app = express();
connectDB();

app.use(express.json());
app.use(require('./middleware/NoSQLInjection'));

app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);
app.use('/api/order', orderRoutes);


app.use(require('../Travel/middleware/errorHandler'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
