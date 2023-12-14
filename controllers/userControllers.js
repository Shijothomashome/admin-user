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
const getLogin = (req, res) => {
    if (req.session.user) {
        res.redirect('/api/user/userDashboard')
    } else {
        res.render('userLogin');
    }
}
const getSignup = (req, res) => {
    res.render('userSignup');
}
const postLogin = async (req, res) => {
    try {
        req.session.user = await userCollection.findOne({ email: req.body.email, password: req.body.password });
        if (req.session.user) {
            res.redirect('/api/user/userDashboard')
        } else {
            res.render('userLogin', { err: 'Enter valid credentials' })
        }
    } catch (err) {
        console.log(err);
    }
}
const postSignup = async (req, res) => {
    try {
        let imageFileName;
        if(req.file){       // for storing image path
            imageFileName = req.file.filename
        }else{
            console.log('No photo has been choosen for profile picture')
        }
        req.body.imageFileName = imageFileName;
        const userData = await new userCollection(req.body).save();
        res.send('new user added')
    }
    catch (err) {
        console.error(err);
    }
}
const getDashboard = (req, res) => {
    if (req.session.user) {
        const user = req.session.user;
        res.render('userDashboard', { title: 'User Dashboard', user })
    }
}
const getLogout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.log('Error destroying session', err)
            res.status(500).send('Internal server error')
        } else {
            res.redirect('/')
        }
    })
}

const getEditProfile = async (req,res) => {
    const userId =req.params.id;
    const user =  await userCollection.findOne({_id:userId})
    console.log(userId);  
    res.render('editProfile',{title: 'user dashboard', user})
}


const putEditProfile = async(req,res) =>{
    try{
        const userId = req.params.id;
        const updatedData = req.body; 
        if(req.file){
            updatedData.imageFileName = req.file.filename
        }
        const updatedUser = await userCollection.findByIdAndUpdate(userId, updatedData);
        // OR
        // const updatedUser = await userCollection.updateOne({_id:userId},{$set: updatedData})
        console.log(updatedUser);
        
        if(!updatedUser){
            return res.status(404).json('User not found')
        }
        res.json(updatedUser);
        }catch(error){
            console.log(error);
            res.status(500).json('Internal Server Error')
        }
    }


module.exports = {
    getIndex,
    getLogin,
    getSignup,
    postLogin,
    postSignup,
    getDashboard,
    getLogout,
    getEditProfile,
    putEditProfile
}