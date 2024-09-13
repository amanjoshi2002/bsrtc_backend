const AboutUs = require('../models/AboutUs');

exports.getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        if (aboutUs) {
            res.json({ content: aboutUs.content });
        } else {
            res.json({ content: '' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAboutUs = async (req, res) => {
    const { content } = req.body;

    try {
        let aboutUs = await AboutUs.findOne();
        if (!aboutUs) {
            aboutUs = new AboutUs();
        }

        aboutUs.content = content;
        await aboutUs.save();

        res.status(201).json({ content: aboutUs.content });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAboutUs = async (req, res) => {
    try {
        await AboutUs.deleteOne();
        res.status(200).json({ message: 'About Us content deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};