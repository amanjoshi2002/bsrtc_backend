// controllers/newsController.js
const News = require('../models/NewsModel');
const path = require('path');

exports.createNews = async (req, res) => {
    try {
        const newsData = {
            title: {
                en: req.body.title.en,
                hi: req.body.title.hi
            },
            publish: req.body.publish,
            authorName: {
                en: req.body.authorName.en,
                hi: req.body.authorName.hi
            },
            headline: {
                en: req.body.headline.en,
                hi: req.body.headline.hi
            },
            subline: {
                en: req.body.subline.en,
                hi: req.body.subline.hi
            },
            photos: req.files.map(file => file.path)
        };

        const news = new News(newsData);
        await news.save();
        res.status(201).json(news);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Get all news articles
exports.getNews = async (req, res) => {
    try {
        const news = await News.find();
        res.status(200).json(news);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a news article
exports.updateNews = async (req, res) => {
    try {
        const updateData = {
            title: {
                en: req.body.title.en,
                hi: req.body.title.hi
            },
            publish: req.body.publish,
            authorName: {
                en: req.body.authorName.en,
                hi: req.body.authorName.hi
            },
            headline: {
                en: req.body.headline.en,
                hi: req.body.headline.hi
            },
            subline: {
                en: req.body.subline.en,
                hi: req.body.subline.hi
            }
        };

        if (req.files['thumbnailPhoto']) {
            updateData.thumbnailPhoto = req.files['thumbnailPhoto'][0].path; // Update thumbnail if uploaded
        }
        if (req.files['photo']) {
            updateData.photo = req.files['photo'][0].path; // Update photo if uploaded
        }

        const news = await News.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(200).json(news);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a news article
exports.deleteNews = async (req, res) => {
    try {
        const news = await News.findByIdAndDelete(req.params.id);
        if (!news) return res.status(404).json({ message: 'News not found' });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};