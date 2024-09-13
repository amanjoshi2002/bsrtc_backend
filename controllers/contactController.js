const Contact = require('../models/Contact');
const Division = require('../models/Division');

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findOne();
        const divisions = await Division.find();
        res.json({ contact, divisions });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateContact = async (req, res) => {
    const { mainPhoneNumber, mainEmail, divisions } = req.body;

    try {
        let contact = await Contact.findOne();
        if (!contact) {
            contact = new Contact();
        }

        contact.mainPhoneNumber = mainPhoneNumber;
        contact.mainEmail = mainEmail;
        await contact.save();

        await Division.deleteMany(); // Clear existing divisions
        await Division.insertMany(divisions); // Insert new divisions

        res.status(201).json({ contact, divisions });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteContact = async (req, res) => {
    try {
        await Contact.deleteOne();
        await Division.deleteMany();
        res.status(200).json({ message: 'Contact and divisions deleted' });
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

        division.name = name;
        division.personInCharge = personInCharge;
        division.phoneNumber = phoneNumber;
        division.email = email;

        await division.save();
        res.status(200).json(division);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteDivision = async (req, res) => {
    const { id } = req.params;

    try {
        const division = await Division.findById(id);
        if (!division) {
            return res.status(404).json({ message: 'Division not found' });
        }

        await division.remove();
        res.status(200).json({ message: 'Division deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};