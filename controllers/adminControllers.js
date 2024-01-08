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
            res.redirect('/api/admin/adminDashboard');
        } else {
            res.render('adminLogin', { alert: 'Invalid Admin credentials' });
        }
    } catch (err) {
        console.log(err);
    }
}

const getDashboard = (req, res) => {

    if (req.session.admin) {
        const admin = req.session.admin
        res.render('adminDashboard', { title: 'Admin Dashboard', admin })
    } else {
        res.render('adminLogin', { alert: 'Session expired Login to continue..!', className: 'success-label' })
    }

}

const getUsers = async (req, res) => {
    try {
        if (req.session.admin) {
            if(req.query.email){
                return res.redirect(`/api/admin/searchUser?email=${req.query.email}`) // if return is not here, then remaining code will execute, so to avoid this error we need to use either 'return' or 'if else'
            }
            const users = await userCollection.find()
            const admin = req.session.admin;
            res.render('usersList', { title: 'Admin Dashboard', admin, users })
        } else {
            res.render('adminLogin', { alert: 'Session expired Login to continue..!', className: 'success-label' })
        }
    } catch (err) {
        console.log(err);
    }
}

const getUserEdit = async (req, res) => {
    try {
        if (req.session.admin) {
            const userId = req.params.id
            const user = await userCollection.findOne({ _id: userId })
            const admin = req.session.admin
            res.render('userEdit', { title: 'Edit user', admin, user })
        } else {
            res.render('adminLogin', { alert: 'Session expired Login to continue..!', className: 'success-label' })
        }
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
        if (req.session.admin) {
            const userId = req.params.id;
            const deletedUser = await userCollection.findByIdAndDelete(userId); //returns the userID
            if (!deletedUser) {
                return res.status(404).json('User not found')
            }
            res.json(deletedUser);
        } else {
            res.render('adminLogin', { alert: 'Session expired Login to continue..!', className: 'success-label' })
        }
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

const getSearchUser = async (req, res) => {
    try {
        if (req.session.admin) {
            const searchByEmail = req.query.email;
            const user = await userCollection.find({ email: searchByEmail });
            const admin = req.session.admin;
            res.render('usersList', { title: 'Admin Dashboard', admin, users: user })
        } else {
            res.render('adminLogin', { alert: 'Session expired Login to continue..!', className: 'success-label' })
        }

    } catch (err) {
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