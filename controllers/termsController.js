const Terms = require('../models/Terms');

// Get all terms
exports.getTerms = async (req, res) => {
    try {
        const termsItems = await Terms.find();
        res.json(termsItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add new terms
exports.addTerms = async (req, res) => {
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const newTerms = new Terms({
            titleEn,
            contentEn,
            titleHi,
            contentHi
        });

        await newTerms.save();
        res.status(201).json(newTerms);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update specific terms
exports.updateTerms = async (req, res) => {
    const { id } = req.params;
    const { titleEn, contentEn, titleHi, contentHi } = req.body;

    try {
        const terms = await Terms.findByIdAndUpdate(
            id,
            { titleEn, contentEn, titleHi, contentHi },
            { new: true }
        );
        
        if (!terms) {
            return res.status(404).json({ message: 'Terms not found' });
        }
        
        res.json(terms);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete specific terms
exports.deleteTerms = async (req, res) => {
    const { id } = req.params;
    try {
        const terms = await Terms.findByIdAndDelete(id);
        if (!terms) {
            return res.status(404).json({ message: 'Terms not found' });
        }
        res.status(200).json({ message: 'Terms deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};