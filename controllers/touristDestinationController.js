const TouristDestination = require('../models/TouristDestination');
const path = require('path');
const fs = require('fs');

exports.createDestination = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const destination = new TouristDestination({ name, image });
        await destination.save();
        res.status(201).json(destination);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getDestinations = async (req, res) => {
    try {
        const destinations = await TouristDestination.find();
        res.json(destinations);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getDestinationById = async (req, res) => {
    const { id } = req.params;

    try {
        const destination = await TouristDestination.findById(id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }
        res.json(destination);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateDestination = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const destination = await TouristDestination.findById(id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        destination.name = name || destination.name;
        if (image) {
            // Delete the old image file
            if (destination.image) {
                const filePath = path.join(__dirname, '..', destination.image);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                } else {
                    console.error('File not found:', filePath);
                }
            }
            destination.image = image;
        }

        await destination.save();
        res.json(destination);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteDestination = async (req, res) => {
    const { id } = req.params;

    try {
        const destination = await TouristDestination.findById(id);
        if (!destination) {
            return res.status(404).json({ message: 'Destination not found' });
        }

        // Delete the image file
        if (destination.image) {
            const filePath = path.join(__dirname, '..', destination.image);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.error('File not found:', filePath);
            }
        }

        await TouristDestination.findByIdAndDelete(id);
        res.json({ message: 'Destination deleted successfully' });
    } catch (err) {
        console.error('Error deleting destination:', err);
        res.status(500).json({ message: err.message });
    }
};