const router=require('express')();
const {signin,signup,signout,service,create} = require('../controllers/client');
const {authenticateUser} = require('../middleware/authenticate');

/**Post Method */

router.route('/signup').post(signup);
router.route('/signin').post(signin);


//Authentication

router.route('/signout').get(authenticateUser,signout);
router.route('/service').get(authenticateUser,service);
router.route('/create').post(authenticateUser,create);


module.exports = router;