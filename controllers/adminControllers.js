const adminCollection = require('../models/adminCollection');
const userCollection = require('../models/userCollection');

function createAdmin() {
    return {
        Name: 'shijo',
        email: "shijo@gmail.com",
        password: 1234
    }
}

const setAdmin = async (req, res) => {
    const check = await adminCollection.find({})

    if (check.length === 0) {
        console.log(1);
        const data = createAdmin()
        await new adminCollection(data).save();
        res.send('Admin set Successfully...')
    } else {
        res.send("You don't have the access to this page...")
    }

}

const getLogin = (req, res) => {
    res.render('adminLogin');
}

const postLogin = async (req, res) => {
    try {
        req.session.admin = await adminCollection.findOne({ email: req.body.email, password: req.body.password });
        if (req.session.admin) {
            // console.log(req.session.admin);
            res.redirect('/api/admin/adminDashboard');
        } else {
            res.send('Invalid Admin credentials');
        }
    } catch (err) {
        console.log(err);
    }
}

const getDashboard = (req, res) => {

    if (req.session.admin) {
        // console.log(req.session.admin);

        const admin = req.session.admin
        res.render('adminDashboard', { title: 'Admin Dashboard', admin })
    }

}

const getUsers = async (req, res) => {
    try {
        
           const  users = await userCollection.find()
      
        const admin = req.session.admin;
        res.render('usersList', { title: 'Admin Dashboard', admin, users })
    } catch (err) {
        console.log(err);
    }
}
const getUserEdit = async (req, res) => {
    try {
        const userId = req.params.id
        const user = await userCollection.findOne({ _id: userId })
        const admin = req.session.admin
        res.render('userEdit', { title: 'Edit user', admin, user })
    } catch (err) {
        console.log(err);
    }
}
const putUserEdit = async (req, res) => {
    try {
        const userId = req.params.id
        const updatedData = req.body;
        if (req.file) {
            updatedData.imageFileName = req.file.filename
        }

        const updatedUser = await userCollection.findByIdAndUpdate(userId, updatedData); // returns the user doc
        // and if i use updateOne over findByIdAndUpdate it will return the acknowledge object
        // console.log(updatedUser);

        if (!updatedUser) {
            return res.status(404).json('User not found')
        }
        res.json(updatedUser);
    } catch (error) {
        console.log(error);
        res.status(500).json('Internal Server Error')
    }
}

const deleteUserDelete = async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(userId);

        const deletedUser = await userCollection.findByIdAndDelete(userId); //returns the userID
        if (!deletedUser) {
            return res.status(404).json('User not found')
        }
        res.json(deletedUser);
    } catch (err) {
        console.log(err)
    }
}


const getLogout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(404).json('Cannot logout')
        }
        res.redirect('/')
    })
}

const getSearchUser = async(req,res) =>{
    try{
        const searchByEmail = req.query.email;
       
        const user = await userCollection.find({email: searchByEmail});
        
        // req.session.search = user
        // req.session.search = user;
        // res.redirect('/api/admin/users')
        console.log(user);
        const admin = req.session.admin;
        res.render('usersList', { title: 'Admin Dashboard', admin, users:user})
    }catch(err){
        console.log(err);
    }
}

module.exports = {
    setAdmin,
    getLogin,
    postLogin,
    getDashboard,
    getUsers,
    getUserEdit,
    putUserEdit,
    deleteUserDelete,
    getLogout,
    getSearchUser
}