const userCollection = require('../models/userCollection.js');


const getIndex = (req, res) => {
    if (req.session.user) {
        res.redirect('/api/user/userDashboard')
    } else if(req.session.admin){
        res.redirect('/api/admin/adminDashboard')
    } else {
        res.render('index');
    }
}

const getAbout = (req ,res) =>{
    if (req.session.user) {
        res.redirect('/api/user/userDashboard')
    } else if(req.session.admin){
        res.redirect('/api/admin/adminDashboard')
    } else {
        res.render('about');
    }
}
const getContactUs = (req ,res) =>{
    if (req.session.user) {
        res.redirect('/api/user/userDashboard')
    } else if(req.session.admin){
        res.redirect('/api/admin/adminDashboard')
    } else {
        res.render('contactUs');
    }
}


module.exports={
    getIndex,
    getAbout,
    getContactUs
}