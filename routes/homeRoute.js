const express = require('express');
const router = express.Router();
const homeControllers = require('../controllers/homeControllers')

router.get('/', homeControllers.getIndex);
router.get('/about',homeControllers.getAbout);
router.get('/contactUs',homeControllers.getContactUs);



module.exports = router;