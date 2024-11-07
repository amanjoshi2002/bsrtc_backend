const Gallery = require('../models/Gallery');
const path = require('path');
const fs = require('fs');

exports.createPhoto = async (req, res) => {
    const { name, type } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const gallery = new Gallery({ name, type, photo });
        await gallery.save();
        res.status(201).json(gallery);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getPhotos = async (req, res) => {
    const { type } = req.query;
    try {
        let query = {};
        if (type) {
            query.type = type;
        }

        const photos = await Gallery.find(query);
        const response = photos.map(photo => ({
            id: photo._id,
            name: photo.name,
            type: photo.type,
            photo: photo.photo
        }));
        res.json(response);
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
        res.json({
            id: photo._id,
            name: photo.name,
            type: photo.type,
            photo: photo.photo
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updatePhoto = async (req, res) => {
    const { id } = req.params;
    const { name, type } = req.body;
    const photo = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const gallery = await Gallery.findById(id);
        if (!gallery) {
            return res.status(404).json({ message: 'Photo not found' });
        }

        gallery.name = name || gallery.name;
        gallery.type = type || gallery.type;
        
        if (photo) {
            // Delete the old photo file
            if (gallery.photo) {
                const filePath = path.join(__dirname, '..', gallery.photo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
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
            const filePath = path.join(__dirname, '..', gallery.photo);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            } else {
                console.error('File not found:', filePath);
            }
        }

        await Gallery.findByIdAndDelete(id);
        res.json({ message: 'Photo deleted successfully' });
    } catch (err) {
        console.error('Error deleting photo:', err);
        res.status(500).json({ message: err.message });
    }
};