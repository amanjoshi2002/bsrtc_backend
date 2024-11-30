// controllers/newsController.js
const News = require('../models/newsModel');

exports.createNews = async (req, res) => {
    try {
        const news = new News({
            title: req.body.title,
            publish: req.body.publish,
            thumbnail: req.files.thumbnail[0].path,
            headline: req.body.headline,
            subline: req.body.subline,
            photo: req.files.photo[0].path,
            content: req.body.content,
            title_hindi: req.body.title_hindi,
            publish_hindi: req.body.publish_hindi,
            content_hindi: req.body.content_hindi,
            headline_hindi: req.body.headline_hindi
        });
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getAllNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.getNewsById = async (req, res) => {
    try {
        const news = await News.findById(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.updateNews = async (req, res) => {
    try {
        const news = await News.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};