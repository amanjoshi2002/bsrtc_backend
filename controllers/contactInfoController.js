const ContactInfo = require('../models/ContactInfo');

exports.createContactInfo = async (req, res) => {
    const { email, phoneNumber1, phoneNumber2 } = req.body;

    try {
        const contactInfo = new ContactInfo({ email, phoneNumber1, phoneNumber2 });
        await contactInfo.save();
        res.status(201).json(contactInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getContactInfos = async (req, res) => {
    try {
        const contactInfos = await ContactInfo.find();
        res.json(contactInfos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getContactInfoById = async (req, res) => {
    const { id } = req.params;

    try {
        const contactInfo = await ContactInfo.findById(id);
        if (!contactInfo) {
            return res.status(404).json({ message: 'Contact info not found' });
        }
        res.json(contactInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateContactInfo = async (req, res) => {
    const { id } = req.params;
    const { email, phoneNumber1, phoneNumber2 } = req.body;

    try {
        const contactInfo = await ContactInfo.findById(id);
        if (!contactInfo) {
            return res.status(404).json({ message: 'Contact info not found' });
        }

        contactInfo.email = email || contactInfo.email;
        contactInfo.phoneNumber1 = phoneNumber1 || contactInfo.phoneNumber1;
        contactInfo.phoneNumber2 = phoneNumber2 || contactInfo.phoneNumber2;

        await contactInfo.save();
        res.json(contactInfo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteContactInfo = async (req, res) => {
    const { id } = req.params;

    try {
        const contactInfo = await ContactInfo.findById(id);
        if (!contactInfo) {
            return res.status(404).json({ message: 'Contact info not found' });
        }

        await ContactInfo.findByIdAndDelete(id);
        res.json({ message: 'Contact info deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};