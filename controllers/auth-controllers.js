const bcrypt = require("bcryptjs");

const User = require("../models/user-model");

const generateToken = require("../utils/get-jwt");

const register = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                status: "fail",
                message: "Email is already registered"
            });
        }

        const user = await User.create({
            name,
            email,
            password,
            phone,
            role: "customer"
        });

        const token = generateToken(user);

        user.password = undefined;

        res.status(201).json({
            status: "success",
            message: "User registered successfully",
            token,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "fail",
                message: "Email and password are required"
            });
        }

        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        const passwordMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!passwordMatch) {
            return res.status(401).json({
                status: "fail",
                message: "Invalid email or password"
            });
        }

        const token = generateToken(user);

        user.password = undefined;

        res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            data: {
                user
            }
        });
    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

module.exports = {
    register,
    login
};