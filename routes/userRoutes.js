const express = require('express');
const router = express.Router();
const userControllers = require('../controllers/userControllers');
const upload = require('../middlewares/fileUpload')

router.get('/login', userControllers.getLogin);
router.get('/signup', userControllers.getSignup);
router.post('/login', userControllers.postLogin);
router.post('/signup',upload.single('userImage'), userControllers.postSignup);
router.get('/userDashboard/:id', userControllers.getDashboard);
router.get('/logout',userControllers.getLogout);
router.get('/editProfile/:id',userControllers.getEditProfile);
router.put('/editProfile/:id',upload.single('userImage'),userControllers.putEditProfile);

module.exports = router;