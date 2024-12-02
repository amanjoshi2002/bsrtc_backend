const CancellationPolicy = require('../models/CancellationPolicy');

// Get all cancellation policies
exports.getCancellationPolicies = async (req, res) => {
    try {
        const policies = await CancellationPolicy.find();
        res.json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new cancellation policy
exports.addCancellationPolicy = async (req, res) => {
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const newPolicy = new CancellationPolicy({
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

// Update specific cancellation policy
exports.updateCancellationPolicy = async (req, res) => {
    const { id } = req.params;
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const policy = await CancellationPolicy.findByIdAndUpdate(
            id,
            { titleEn, contentEn, titleHi, contentHi },
            { new: true }
        );
        
        if (!policy) {
            return res.status(404).json({ message: 'Cancellation Policy not found' });
        }
        
        res.json(policy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete specific cancellation policy
exports.deleteCancellationPolicy = async (req, res) => {
    const { id } = req.params;
    try {
        const policy = await CancellationPolicy.findByIdAndDelete(id);
        if (!policy) {
            return res.status(404).json({ message: 'Cancellation Policy not found' });
        }
        res.status(200).json({ message: 'Cancellation Policy deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};