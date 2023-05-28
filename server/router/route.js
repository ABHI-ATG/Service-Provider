const express=require('express');
const router = express.Router();
const controller = require('../controllers/appController');


/**Post Method */
router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/register').post(controller.register);
router.route('/login').post(controller.login);

module.exports = router;