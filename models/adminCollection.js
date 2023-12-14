const mongoose = require('mongoose');

const adminCollection = mongoose.model('adminCollection', { Name: String, email: String, password: String });
module.exports = adminCollection;



