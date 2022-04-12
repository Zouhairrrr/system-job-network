const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");
const middleware = require('../middleware/auth.middlewares');

router.route("/create").post(userController.createUser);
router.route("/update/:id").put(userController.updateUser);
router.route("/delete/:id").delete(userController.deleteUser);
router.route("/").get(userController.allUsers);
router.route("/profile").get(middleware.VerifyJwt,userController.profile);
router.route("/profile").put(middleware.VerifyJwt,userController.updateProfile);
router.route("/:id").get(userController.oneUser);


module.exports = router;
