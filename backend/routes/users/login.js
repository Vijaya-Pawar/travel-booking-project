const express = require("express");
const cryptoJs = require("crypto-js");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();

// ================= SIGNIN =================

router.post("/signin", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.send(
                result.error(res, "Invalid email or password")
            );
        }

        // convert entered password to SHA256
        const hashedPassword = cryptoJs.SHA256(password).toString();

        // compare passwords
        if (user.password !== hashedPassword) {
            return res.send(
                result.error(res, "Invalid email or password")
            );
        }

        // create JWT token
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                role: user.role,
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        const data = {
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
        };

        res.send(
            result.success(res, data, "Login successful")
        );

    } catch (error) {
        res.send(result.error(res, error.message));
    }
});

module.exports = router;