const users = require("../models/user-model");

const register = (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
        return res.status(400).json({
            status: "fail",
            message: "Email already exists"
        });
    }

    const newUser = {
        id: users.length + 1,
        name: name,
        email: email,
        password: password,
        role: "customer"
    };

    users.push(newUser);

    res.status(201).json({
        status: "success",
        message: "User registered successfully",
        data: {
            user: newUser
        }
    });
};

module.exports = {
    register
};