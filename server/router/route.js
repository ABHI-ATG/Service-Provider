const express=require('express');
const router = express.Router();

const controller = require('../controllers/appController.js');


/**Post Method */
router.route('/SignUp').post(controller.register);
router.route('/login').post(controller.verifyUser,controller.login);