const Tender = require('../models/Tender');
const path = require('path');
const fs = require('fs');

exports.createTender = async (req, res) => {
    const { name, referenceNo, closingDate, bidOpeningDate } = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const tender = new Tender({ name, pdf, referenceNo, closingDate, bidOpeningDate });
        await tender.save();
        res.status(201).json(tender);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getTenders = async (req, res) => {
    try {
        const tenders = await Tender.find();
        res.json(tenders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTenderById = async (req, res) => {
    const { id } = req.params;

    try {
        const tender = await Tender.findById(id);
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }
        res.json(tender);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateTender = async (req, res) => {
    const { id } = req.params;
    const { name, referenceNo, closingDate, bidOpeningDate } = req.body;
    const pdf = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const tender = await Tender.findById(id);
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        tender.name = name || tender.name;
        tender.referenceNo = referenceNo || tender.referenceNo;
        tender.closingDate = closingDate || tender.closingDate;
        tender.bidOpeningDate = bidOpeningDate || tender.bidOpeningDate;
        if (pdf) {
            // Delete the old PDF file
            if (tender.pdf) {
                const filePath = path.join(__dirname, '..', tender.pdf);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    console.error('File not found:', filePath);
                }
            }
            tender.pdf = pdf;
        }

        await tender.save();
        res.json(tender);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteTender = async (req, res) => {
    const { id } = req.params;

    try {
        const tender = await Tender.findById(id);
        if (!tender) {
            return res.status(404).json({ message: 'Tender not found' });
        }

        // Delete the PDF file
        if (tender.pdf) {
            const filePath = path.join(__dirname, '..', tender.pdf);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.error('File not found:', filePath);
            }
        }

        await Tender.findByIdAndDelete(id);
        res.json({ message: 'Tender deleted successfully' });
    } catch (err) {
        console.error('Error deleting tender:', err);
        res.status(500).json({ message: err.message });
    }
};