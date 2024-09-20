const FAQ = require('../models/FAQ');

exports.createFAQ = async (req, res) => {
    const { question, answer } = req.body;

    try {
        const faq = new FAQ({ question, answer });
        await faq.save();
        res.status(201).json(faq);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.json(faqs);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getFAQById = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }
        res.json(faq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        faq.question = question || faq.question;
        faq.answer = answer || faq.answer;

        await faq.save();
        res.json(faq);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteFAQ = async (req, res) => {
    const { id } = req.params;

    try {
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        await FAQ.findByIdAndDelete(id);
        res.json({ message: 'FAQ deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};