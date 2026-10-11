const express = require("express");
const cryptojs = require("crypto-js");
const User = require("../../models/User");
const result = require("../../utils/result");

const router = express.Router();

// ================= REGISTER USER =================
// URL: POST http://localhost:5000/api/auth/register

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.send(
                result.error(res, "All fields are required")
            );
        }

        const encryptedPassword = cryptojs.SHA256(password).toString();

        const user = new User({
            name,
            email,
            password: encryptedPassword,
        });

        await user.save();

        res.send(
            result.success(res, user, "User registered successfully")
        );

    } catch (err) {
        res.send(result.error(res, err.message));
    }
});

module.exports = router;
