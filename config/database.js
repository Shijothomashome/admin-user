const mongoose = require('mongoose');

// connection
const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/loginDB');
        console.log('Connected to database successfully');
    } catch (err) {
        console.error('Error connecting to the database', err.message)
    }
}
module.exports = connectDB;