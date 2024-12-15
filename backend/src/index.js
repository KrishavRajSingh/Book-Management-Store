const express = require('express');
const pool = require('./db');
const cors = require('cors');
const bookRoutes = require('./routes/bookRoutes');
const { createBooksTable } = require('./models/Book')
const authRoutes = require('./routes/authRoutes');
const createUsersTable = require('./models/User');
const app = express();

const port = process.env.PORT || 5000;
// mongoose.connect('mongodb+srv://krishavrajsingh:7HZnFKUuvYi4tmDN@cluster0.jo9dnze.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
// .then(() => {
//     console.log('MongoDB connected successfully');
// })
// .catch((error) => {
//     console.error('MongoDB connection error:', error);
// });
createBooksTable();
createUsersTable();
app.use(express.json());
app.use(cors());
app.use('/books', bookRoutes);
app.use('/auth', authRoutes);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
