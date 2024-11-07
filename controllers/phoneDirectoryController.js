const PhoneDirectoryDivision = require('../models/PhoneDirectory');

exports.getDivisions = async (req, res) => {
    const { lang } = req.params;

    try {
        const divisions = await PhoneDirectoryDivision.find();
        const response = divisions.map(division => ({
            name: lang === 'hi' ? division.nameHi : division.nameEn,
            officers: division.officers.map(officer => ({
                name: lang === 'hi' ? officer.nameHi : officer.nameEn,
                designation: lang === 'hi' ? officer.designationHi : officer.designationEn,
                office: lang === 'hi' ? officer.officeHi : officer.officeEn,
                phoneNumber: officer.phoneNumber,
                email: officer.email
            }))
        }));
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createDivision = async (req, res) => {
    const { nameEn, nameHi, officers } = req.body;

    const division = new PhoneDirectoryDivision({
        nameEn,
        nameHi,
        officers
    });

    try {
        const newDivision = await division.save();
        res.status(201).json(newDivision);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateDivisions = async (req, res) => {
    const { divisions } = req.body;

    try {
        const existingDivisions = await PhoneDirectoryDivision.find();
        const existingDivisionIds = existingDivisions.map(division => division._id.toString());

        const updatedDivisionIds = divisions.map(division => division._id).filter(id => id);

        // Delete divisions that are not in the updated list
        const divisionsToDelete = existingDivisionIds.filter(id => !updatedDivisionIds.includes(id));
        await PhoneDirectoryDivision.deleteMany({ _id: { $in: divisionsToDelete } });

        // Update existing divisions and create new ones
        for (const divisionData of divisions) {
            const { _id, nameEn, nameHi, officers } = divisionData;
            if (_id) {
                // Update existing division
                const division = await PhoneDirectoryDivision.findById(_id);
                if (division) {
                    division.nameEn = nameEn;
                    division.nameHi = nameHi;
                    division.officers = officers;
                    await division.save();
                }
            } else {
                // Create new division
                const newDivision = new PhoneDirectoryDivision({ nameEn, nameHi, officers });
                await newDivision.save();
            }
        }
        res.status(200).json({ message: 'Divisions updated successfully' });
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