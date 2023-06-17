const express=require('express');
const router = express.Router();
const {signin,signup,signout} = require('../controllers/provider');
const {authenticatePro} = require('../middleware/authenticate');

/**Post Method */

router.route('/signup').post(signup);
router.route('/signin').post(signin);


//Authentication

router.route('/signout').get(authenticatePro,signout);


module.exports = router;