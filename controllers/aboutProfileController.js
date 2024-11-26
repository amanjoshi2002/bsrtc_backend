const AboutProfile = require('../models/AboutProfile');
const path = require('path');
const fs = require('fs');

exports.createAboutProfile = async (req, res) => {
    const { titleEn, titleHi, nameEn, nameHi } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const aboutProfile = new AboutProfile({
        titleEn,
        titleHi,
        nameEn,
        nameHi,
        photos: imageUrl ? [imageUrl] : []
    });

    try {
        const newAboutProfile = await aboutProfile.save();
        res.status(201).json(newAboutProfile);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getAboutProfiles = async (req, res) => {
    const { lang } = req.params;

    try {
        const aboutProfiles = await AboutProfile.find();
        const response = aboutProfiles.map(profile => ({
            id: profile._id,
            title: lang === 'hi' ? profile.titleHi : profile.titleEn,
            name: lang === 'hi' ? profile.nameHi : profile.nameEn,
            photos: profile.photos
        }));
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAboutProfile = async (req, res) => {
    const { id } = req.params;
    const { titleEn, titleHi, nameEn, nameHi } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const aboutProfile = await AboutProfile.findById(id);
        if (!aboutProfile) {
            return res.status(404).json({ message: 'AboutProfile not found' });
        }

        aboutProfile.titleEn = titleEn || aboutProfile.titleEn;
        aboutProfile.titleHi = titleHi || aboutProfile.titleHi;
        aboutProfile.nameEn = nameEn || aboutProfile.nameEn;
        aboutProfile.nameHi = nameHi || aboutProfile.nameHi;

        if (imageUrl) {
            aboutProfile.photos.forEach(photo => {
                const filePath = path.join(__dirname, '..', photo);
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }
            });
            aboutProfile.photos = [imageUrl];
        }

        await aboutProfile.save();
        res.json(aboutProfile);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteAboutProfile = async (req, res) => {
    const { id } = req.params;
    console.log(`Attempting to delete profile with ID: ${id}`);
    try {
        const deletedProfile = await AboutProfile.findByIdAndDelete(id);
        if (!deletedProfile) {
            console.log('Profile not found');
            return res.status(404).json({ message: 'Profile not found' });
        }
        console.log('Profile deleted successfully');
        res.json({ message: 'About Profile deleted successfully' });
    } catch (err) {
        console.error('Error deleting profile:', err);
        res.status(500).json({ message: 'Error deleting About Profile' });
    }
};