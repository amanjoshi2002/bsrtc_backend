const Division = require('../models/Division');

exports.createDivision = async (req, res) => {
    const { nameEn, nameHi, personInChargeEn, personInChargeHi, phoneNumber, email } = req.body;

    try {
        const division = new Division({ 
            nameEn, 
            nameHi, 
            personInChargeEn, 
            personInChargeHi, 
            phoneNumber, 
            email 
        });
        await division.save();
        res.status(201).json(division);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDivisions = async (req, res) => {
    const { lang } = req.params;
    try {
        const divisions = await Division.find();
        const response = divisions.map(division => ({
            id: division._id,
            name: lang === 'hi' ? division.nameHi : division.nameEn,
            personInCharge: lang === 'hi' ? division.personInChargeHi : division.personInChargeEn,
            phoneNumber: division.phoneNumber,
            email: division.email
        }));
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDivisionById = async (req, res) => {
    const { id, lang } = req.params;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }
        
        const response = {
            id: division._id,
            name: lang === 'hi' ? division.nameHi : division.nameEn,
            personInCharge: lang === 'hi' ? division.personInChargeHi : division.personInChargeEn,
            phoneNumber: division.phoneNumber,
            email: division.email
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDivision = async (req, res) => {
    const { id } = req.params;
    const { 
        nameEn, nameHi, 
        personInChargeEn, personInChargeHi, 
        phoneNumber, email 
    } = req.body;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        division.nameEn = nameEn || division.nameEn;
        division.nameHi = nameHi || division.nameHi;
        division.personInChargeEn = personInChargeEn || division.personInChargeEn;
        division.personInChargeHi = personInChargeHi || division.personInChargeHi;
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