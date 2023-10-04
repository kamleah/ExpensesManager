const User = require('../models/Registration.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET_KEY;
const accessTokenExp = process.env.ACCESS_TOKEN_EXP;
const refreshTokenExp = process.env.REFRESH_TOKEN_EXP;

const getAllUsers = async (req, res) => {
    try {
        res.json({ "users": "succeess" });
    } catch (error) {
        console.error('Error fetching all users:', error);
        res.json({ "users": "succeess" });
    }
};

const registerUser = async (req, res) => {
    try {
        const existUser = await User.findOne({ mobile_no: req.body.mobile_no });
        if (existUser) {
            return res.status(409).json({ status: "failed", message: 'User with this mobile number already exists.' });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = new User({
            mobile_no: req.body.mobile_no,
            password: hashedPassword,
        });
        await user.save();
        res.status(201).json({ status: "success", message: 'Registration successful' });
    } catch (error) {
        res.status(500).json({ status: "failed", error: 'An error occurred while registering the user' });
    }
};

const login = async (req, res) => {
    try {
        const { mobile_no, password } = req.body;
        const user = await User.findOne({ mobile_no: req.body.mobile_no });
        if (!(mobile_no && password)) {
            res.status(400).json({ status: "failed", message: "All input is required" });
        }

        if (!user) {
            return res.status(401).json({ status: "failed", message: 'Invalid mobile no or password 1' });
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);

        if (!validPassword) {
            return res.status(401).json({ status: "failed", message: 'Invalid mobile no or password' });
        }

        const accessToken = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: `${accessTokenExp}`,
        });
        const refreshToken = jwt.sign({ _id: user._id }, secretKey, {
            expiresIn: `${refreshTokenExp}`,
        });

        res.status(200).json({ status: "success", message: 'Login successful', accessToken: accessToken, refreshToken: refreshToken })
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: "failed", message: 'Error logging in' });
    }
};

const refreshToken = async (req, res) => {
    try {
        const refreshToken = req.body.refreshToken;
        if (!refreshToken) {
            return res.status(401).json({ status: "failed", message: 'Access Denied. No refresh token provided.' });
        }
        try {
            const decoded = jwt.verify(refreshToken, secretKey);
            const accessToken = jwt.sign({ _id: decoded._id }, secretKey, { expiresIn: accessTokenExp });
            const newRefreshToken = jwt.sign({ _id: decoded._id }, secretKey, {
                expiresIn: refreshTokenExp,
            });
            res.status(200).json({ status: "success", message: 'token generated successfully', accessToken: accessToken, refreshToken: newRefreshToken })
        } catch (error) {
            return res.status(400).json({ status: "failed", message: 'Invalid refresh token.' });
        }
    } catch (error) {
        res.status(500).json({ status: "failed", message: 'Error refresh token' });
    }
};

module.exports = {
    getAllUsers,
    registerUser,
    login,
    refreshToken
};
