const { application } = require('express');
const mongoose = require('mongoose');


// creating a schema
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    phoneNumber: {
        type: Number,
        required: [true, 'Phone number is required']
    },
    password: {
        type: String,
        required: [true, 'Set your password'],
    },
    imageFileName: {
        type: String
    }
});

// creating collection
const userCollection = new mongoose.model('userCollection', userSchema)

module.exports = userCollection; // it is exported to userController
