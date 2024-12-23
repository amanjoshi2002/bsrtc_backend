require('dotenv').config();

const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');
const axios = require('axios');

exports.signup = async (req, res) => {
    const { name, phoneNumber, email, password } = req.body; // Removed role from destructuring

    try {
        const user = new User({ name, phoneNumber, email, password }); // Role will default to 'user'
        await user.save();

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });

        res.status(201).json({ message: 'User created successfully', token });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.login = async (req, res) => {
    const { email, password, captchaToken } = req.body;

    // Verify CAPTCHA
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const captchaVerificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

    try {
        const captchaResponse = await axios.post(captchaVerificationUrl);
        if (!captchaResponse.data.success) {
            return res.status(400).json({ message: 'CAPTCHA verification failed' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Check if the account is locked
        if (user.isLocked()) {
            return res.status(403).json({ message: 'Account is locked. Try again later.' });
        }

        // Check password
        if (!(await user.comparePassword(password))) {
            user.failedLoginAttempts += 1;

            // Lock the account if too many failed attempts
            if (user.failedLoginAttempts >= 5) {
                user.lockUntil = Date.now() + 30 * 60 * 1000; // Lock for 30 minutes
            }

            await user.save();
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Reset failed login attempts on successful login
        user.failedLoginAttempts = 0;
        user.lockUntil = undefined;
        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, jwtSecret, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, phoneNumber, email, role } = req.body;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.phoneNumber = phoneNumber || user.phoneNumber;
        user.email = email || user.email;
        user.role = role || user.role;

        await user.save();
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        console.log(`Attempting to delete user with ID: ${id}`); // Debugging line
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            console.log('User not found'); // Debugging line
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User deleted successfully'); // Debugging line
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err); // Debugging line
        res.status(500).json({ message: err.message });
    }
};