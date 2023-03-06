const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/users');
const bookRoutes = require('./routes/books');
const orderRoutes = require('./routes/orders');
const authMiddleware = require('./middleware/auth');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error(err);
});

app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/orders', authMiddleware, orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
