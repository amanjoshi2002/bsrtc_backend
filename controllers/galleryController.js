const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

exports.createPhoto = async (req, res) => {
    const { name } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const gallery = new Gallery({ name, photo });
        await gallery.save();
        res.status(201).json(gallery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPhotos = async (req, res) => {
    try {
        const photos = await Gallery.find();
        res.json(photos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getPhotoById = async (req, res) => {
    const { id } = req.params;

    try {
        const photo = await Gallery.findById(id);
        if (!photo) {
            return res.status(404).json({ message: 'Photo not found' });
        }
        res.json(photo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        gallery.name = name || gallery.name;
        if (photo) {
            // Delete the old photo file
            if (gallery.photo) {
                fs.unlinkSync(path.join(__dirname, '..', gallery.photo));
            }
            gallery.photo = photo;
        }

        await gallery.save();
        res.json(gallery);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deletePhoto = async (req, res) => {
    const { id } = req.params;

    try {
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        // Delete the photo file
        if (gallery.photo) {
            fs.unlinkSync(path.join(__dirname, '..', gallery.photo));
        }

        await gallery.remove();
        res.json({ message: 'Photo deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};