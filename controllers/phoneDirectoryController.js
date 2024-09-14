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
            const { _id, name, officers } = divisionData;
            if (_id) {
                // Update existing division
                const division = await PhoneDirectoryDivision.findById(_id);
                if (division) {
                    division.name = name;
                    division.officers = officers;
                    await division.save();
                }
            } else {
                // Create new division
                const newDivision = new PhoneDirectoryDivision({ name, officers });
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