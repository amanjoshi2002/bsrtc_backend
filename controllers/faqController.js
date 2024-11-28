const FAQ = require('../models/FAQ');

exports.createFAQ = async (req, res) => {
    const { questionEn, answerEn, questionHi, answerHi } = req.body;

    try {
        const faq = new FAQ({ questionEn, answerEn, questionHi, answerHi });
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

exports.updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { questionEn, answerEn, questionHi, answerHi } = req.body;

    try {
        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ message: 'FAQ not found' });
        }

        faq.questionEn = questionEn || faq.questionEn;
        faq.answerEn = answerEn || faq.answerEn;
        faq.questionHi = questionHi || faq.questionHi;
        faq.answerHi = answerHi || faq.answerHi;

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