const router  = require("express").Router();
const authController = require("../controllers/authController");

router.get("/", authController.getAllUsers);
router.post("/register", authController.registerUser);
router.post("/login", authController.login);
router.post("/refresh", authController.refreshToken);

module.exports = router;