const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://yousef777:0IhwMN7Eiy05ikR3@fullstack.ut2qc.mongodb.net/?retryWrites=true&w=majority&appName=fullstack');
    console.log(`mongo connected: ${conn.connection.host}`);
};

module.exports = connectDB;