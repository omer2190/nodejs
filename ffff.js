// app.js
const dotenv = require("dotenv");
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const installmentRoutes = require('./routes/installments');
require('./utils/cronJob'); 

const app = express();
dotenv.config();
app.use(express.json());
const path = require('path');



app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/installments', installmentRoutes);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));



