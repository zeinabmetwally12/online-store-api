const express = require("express");

const {
    register,
    login
} = require("../controllers/auth-controllers");

const protect = require("../middleware/auth-middleware");

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        status: "success",
        message: "You are authenticated",
        user: req.user
    });
});

module.exports = router;