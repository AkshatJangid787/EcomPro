const express = require("express");
const { signup , login, getAllUsers, deleteUser } = require("../controller/user");

const router = express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/createUser",login);
router.get("/users", getAllUsers);
router.delete("/users/:id", deleteUser);


module.exports = router;