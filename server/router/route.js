const express=require('express');
const router = express.Router();
const controller = require('../controllers/appController');


/**Post Method */
router.route('/signup').post(controller.register);
router.route('/signin').post(controller.login);

module.exports = router;