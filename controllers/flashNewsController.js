// controllers/flashNewsController.js
const FlashNews = require('../models/Flashmodel');

exports.createFlashNews = async (req, res) => {
    try {
        const flashNews = new FlashNews({
            title: req.body.title,
            url: req.body.url
        });
        await flashNews.save();
        res.status(201).json(flashNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllFlashNews = async (req, res) => {
    try {
        const flashNews = await FlashNews.find();
        res.status(200).json(flashNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getFlashNewsById = async (req, res) => {
    try {
        const flashNews = await FlashNews.findById(req.params.id);
        if (!flashNews) return res.status(404).json({ message: 'Flash News not found' });
        res.status(200).json(flashNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateFlashNews = async (req, res) => {
    try {
        const flashNews = await FlashNews.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flashNews) return res.status(404).json({ message: 'Flash News not found' });
        res.status(200).json(flashNews);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteFlashNews = async (req, res) => {
    try {
        const flashNews = await FlashNews.findByIdAndDelete(req.params.id);
        if (!flashNews) return res.status(404).json({ message: 'Flash News not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};