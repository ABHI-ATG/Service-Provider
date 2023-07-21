const router = require("express")();
const {
  signin,
  signup,
  signout,
  service,
  create,
  messageUpdate,
  send,
} = require("../controllers/client");
const { authenticateUser } = require("../middleware/authenticate");

/**Post Method */

router.route("/signup").post(signup);
router.route("/signin").post(signin);

//Authentication

router.route("/signout").get(authenticateUser, signout);
router.route("/service").get(authenticateUser, service);
router.route("/create").post(authenticateUser, create);
router.route("/messageUpdate").post(authenticateUser, messageUpdate);
router.route("/send").post(authenticateUser, send);

module.exports = router;
