const PhoneDirectoryDivision = require('../models/PhoneDirectory');

exports.getDivisions = async (req, res) => {
    try {
        const divisions = await PhoneDirectoryDivision.find();
        res.json(divisions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDivision = async (req, res) => {
    const { name, officers } = req.body;

    const division = new PhoneDirectoryDivision({
        name,
        officers
    });

    try {
        const newDivision = await division.save();
        res.status(201).json(newDivision);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDivision = async (req, res) => {
    const { id } = req.params;
    const { name, officers } = req.body;

    try {
        const division = await PhoneDirectoryDivision.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        division.name = name;
        division.officers = officers;

        const updatedDivision = await division.save();
        res.status(200).json(updatedDivision);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDivision = async (req, res) => {
    const { id } = req.params;

    try {
        const division = await PhoneDirectoryDivision.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        await division.remove();
        res.status(200).json({ message: 'Division deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};