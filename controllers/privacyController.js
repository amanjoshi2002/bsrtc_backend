const Privacy = require('../models/Privacy');

// Get all privacy policies
exports.getPrivacy = async (req, res) => {
    try {
        const privacyItems = await Privacy.find();
        res.json(privacyItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new privacy policy
exports.addPrivacy = async (req, res) => {
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const newPrivacy = new Privacy({
            titleEn,
            contentEn,
            titleHi,
            contentHi
        });

        await newPrivacy.save();
        res.status(201).json(newPrivacy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update specific privacy policy
exports.updatePrivacy = async (req, res) => {
    const { id } = req.params;
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const privacy = await Privacy.findByIdAndUpdate(
            id,
            { titleEn, contentEn, titleHi, contentHi },
            { new: true }
        );
        
        if (!privacy) {
            return res.status(404).json({ message: 'Privacy policy not found' });
        }
        
        res.json(privacy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete specific privacy policy
exports.deletePrivacy = async (req, res) => {
    const { id } = req.params;
    try {
        const privacy = await Privacy.findByIdAndDelete(id);
        if (!privacy) {
            return res.status(404).json({ message: 'Privacy policy not found' });
        }
        res.status(200).json({ message: 'Privacy policy deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
