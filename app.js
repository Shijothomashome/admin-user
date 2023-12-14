const express = require('express');
const app = express();
const session = require('express-session');
const {v4:uuidv4} = require('uuid');

const nocache = require('nocache')
const connectDB = require('./config/database.js')

const userRoutes = require('./routes/userRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const homeRoute = require('./routes/homeRoute.js')
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true    
}))
app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }))
app.use(nocache());
app.use('/',homeRoute);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);


connectDB();

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
