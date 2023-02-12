const express = require("express");
const router = express();

const {logoutPengelola, switchToUser, switchToPengelola} = require("../controller/authController")
const { verifyTokenPengelola} = require("../middleware/verifyToken")

router.post('/switch-to-user', verifyTokenPengelola, switchToUser)
router.delete("/logout-pengelola", verifyTokenPengelola, logoutPengelola)

module.exports = router;