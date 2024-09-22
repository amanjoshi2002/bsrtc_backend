const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/auth');

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
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

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