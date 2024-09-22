const Division = require('../models/Division');

exports.createDivision = async (req, res) => {
    const { name, personInCharge, phoneNumber, email } = req.body;

    try {
        const division = new Division({ name, personInCharge, phoneNumber, email });
        await division.save();
        res.status(201).json(division);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDivisions = async (req, res) => {
    try {
        const divisions = await Division.find();
        res.json(divisions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDivisionById = async (req, res) => {
    const { id } = req.params;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }
        res.json(division);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDivision = async (req, res) => {
    const { id } = req.params;
    const { name, personInCharge, phoneNumber, email } = req.body;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        division.name = name || division.name;
        division.personInCharge = personInCharge || division.personInCharge;
        division.phoneNumber = phoneNumber || division.phoneNumber;
        division.email = email || division.email;

        await division.save();
        res.json(division);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDivision = async (req, res) => {
    const { id } = req.params;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        await Division.findByIdAndDelete(id);
        res.json({ message: 'Division deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};