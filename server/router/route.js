const express=require('express');
const router = express.Router();
const controller = require('../controllers/appController');
const auth = require('../middleware/authenticate');

/**Post Method */

router.route('/signup').post(controller.signup);
router.route('/signin').post(controller.signin);
router.route('/register').post(controller.register);
router.route('/login').post(controller.login);


//Authentication

router.route('/logout').get(auth.authenticateUser,controller.logout);
router.route('/out').get(auth.authenticatePro,controller.out);


module.exports = router;