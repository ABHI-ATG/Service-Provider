const express=require('express');
const router = express.Router();
const {signin,signup,signout,messageUpdate} = require('../controllers/provider');
const {authenticatePro} = require('../middleware/authenticate');

/**Post Method */

router.route('/signup').post(signup);
router.route('/signin').post(signin);


//Authentication

router.route('/messageUpdate').post(authenticatePro,messageUpdate);
router.route('/signout').get(authenticatePro,signout);


module.exports = router;