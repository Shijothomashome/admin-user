const express = require('express')
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');
const upload = require('../middlewares/fileUpload')


router.get('/setAdmin',adminControllers.setAdmin)

router.get('/login',adminControllers.getLogin);
router.post('/login',adminControllers.postLogin);
router.get('/adminDashboard',adminControllers.getDashboard);
router.get('/users',adminControllers.getUsers);
router.get('/userEdit/:id',adminControllers.getUserEdit);
router.put('/userEdit/:id',upload.single('userImage'), adminControllers.putUserEdit);
router.delete('/userDelete/:id',adminControllers.deleteUserDelete);
router.get('/logout',adminControllers.getLogout);
router.get('/searchUser',adminControllers.getSearchUser);



module.exports = router;
