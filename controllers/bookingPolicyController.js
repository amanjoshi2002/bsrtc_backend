const BookingPolicy = require('../models/BookingPolicy');

// Get all booking policies
exports.getBookingPolicies = async (req, res) => {
    try {
        const policies = await BookingPolicy.find();
        res.json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new booking policy
exports.addBookingPolicy = async (req, res) => {
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const newPolicy = new BookingPolicy({
            titleEn,
            contentEn,
            titleHi,
            contentHi
        });

        await newPolicy.save();
        res.status(201).json(newPolicy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update specific booking policy
exports.updateBookingPolicy = async (req, res) => {
    const { id } = req.params;
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const policy = await BookingPolicy.findByIdAndUpdate(
            id,
            { titleEn, contentEn, titleHi, contentHi },
            { new: true }
        );
        
        if (!policy) {
            return res.status(404).json({ message: 'Booking Policy not found' });
        }
        
        res.json(policy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete specific booking policy
exports.deleteBookingPolicy = async (req, res) => {
    const { id } = req.params;
    try {
        const policy = await BookingPolicy.findByIdAndDelete(id);
        if (!policy) {
            return res.status(404).json({ message: 'Booking Policy not found' });
        }
        res.status(200).json({ message: 'Booking Policy deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};