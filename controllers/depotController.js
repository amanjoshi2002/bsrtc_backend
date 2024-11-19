const Depot = require('../models/Depot');

exports.createDepot = async (req, res) => {
    const { nameEn, nameHi, personInChargeEn, personInChargeHi, phoneNumber, email } = req.body;

    try {
        const depot = new Depot({ 
            nameEn, 
            nameHi, 
            personInChargeEn, 
            personInChargeHi, 
            phoneNumber, 
            email 
        });
        await depot.save();
        res.status(201).json(depot);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDepots = async (req, res) => {
    const { lang } = req.params;
    try {
        const depots = await Depot.find();
        const response = depots.map(depot => ({
            _id: depot._id,
            nameEn: depot.nameEn,
            nameHi: depot.nameHi,
            personInChargeEn: depot.personInChargeEn,
            personInChargeHi: depot.personInChargeHi,
            phoneNumber: depot.phoneNumber,
            email: depot.email
        }));
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDepotById = async (req, res) => {
    const { id, lang } = req.params;

    try {
        const depot = await Depot.findById(id);
        if (!depot) {
            return res.status(404).json({ message: 'Depot not found' });
        }
        
        const response = {
            id: depot._id,
            name: lang === 'hi' ? depot.nameHi : depot.nameEn,
            personInCharge: lang === 'hi' ? depot.personInChargeHi : depot.personInChargeEn,
            phoneNumber: depot.phoneNumber,
            email: depot.email
        };
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDepot = async (req, res) => {
    const { id } = req.params;
    const { 
        nameEn, nameHi, 
        personInChargeEn, personInChargeHi, 
        phoneNumber, email 
    } = req.body;

    try {
        const depot = await Depot.findById(id);
        if (!depot) {
            return res.status(404).json({ message: 'Depot not found' });
        }

        depot.nameEn = nameEn || depot.nameEn;
        depot.nameHi = nameHi || depot.nameHi;
        depot.personInChargeEn = personInChargeEn || depot.personInChargeEn;
        depot.personInChargeHi = personInChargeHi || depot.personInChargeHi;
        depot.phoneNumber = phoneNumber || depot.phoneNumber;
        depot.email = email || depot.email;

        await depot.save();
        res.json(depot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDepot = async (req, res) => {
    const { id } = req.params;

    try {
        const depot = await Depot.findById(id);
        if (!depot) {
            return res.status(404).json({ message: 'Depot not found' });
        }

        await Depot.findByIdAndDelete(id);
        res.json({ message: 'Depot deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};