const GalleryEvent = require('../models/GalleryEvent');

exports.createGalleryEvent = async (req, res) => {
    const { category } = req.body;
    const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    try {
        const galleryEvent = new GalleryEvent({ category, photos });
        await galleryEvent.save();
        res.status(201).json(galleryEvent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getGalleryEvents = async (req, res) => {
    try {
        const galleryEvents = await GalleryEvent.find();
        res.json(galleryEvents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getGalleryEventById = async (req, res) => {
    const { id } = req.params;

    try {
        const galleryEvent = await GalleryEvent.findById(id);
        if (!galleryEvent) {
            return res.status(404).json({ message: 'Gallery event not found' });
        }
        res.json(galleryEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateGalleryEvent = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;
    const photos = req.files ? req.files.map(file => `/uploads/${file.filename}`) : [];

    try {
        const galleryEvent = await GalleryEvent.findById(id);
        if (!galleryEvent) {
            return res.status(404).json({ message: 'Gallery event not found' });
        }

        galleryEvent.category = category || galleryEvent.category;
        if (photos.length > 0) {
            galleryEvent.photos = photos;
        }

        await galleryEvent.save();
        res.json(galleryEvent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteGalleryEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const galleryEvent = await GalleryEvent.findById(id);
        if (!galleryEvent) {
            return res.status(404).json({ message: 'Gallery event not found' });
        }

        await GalleryEvent.findByIdAndDelete(id);
        res.json({ message: 'Gallery event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 