const AboutUs = require('../models/AboutUs');

exports.getAboutUs = async (req, res) => {
    try {
        const aboutUs = await AboutUs.findOne();
        if (aboutUs) {
            res.json({
                aboutUsEn: aboutUs.aboutUsEn || '',
                visionEn: aboutUs.visionEn || '',
                missionEn: aboutUs.missionEn || '',
                aboutUsHi: aboutUs.aboutUsHi || '',
                visionHi: aboutUs.visionHi || '',
                missionHi: aboutUs.missionHi || ''
            });
        } else {
            res.json({
                aboutUsEn: '', visionEn: '', missionEn: '',
                aboutUsHi: '', visionHi: '', missionHi: ''
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAboutUs = async (req, res) => {
    const { 
        aboutUsEn, visionEn, missionEn,
        aboutUsHi, visionHi, missionHi 
    } = req.body;

    try {
        let aboutUs = await AboutUs.findOne();
        if (!aboutUs) {
            aboutUs = new AboutUs();
        }

        aboutUs.aboutUsEn = aboutUsEn;
        aboutUs.visionEn = visionEn;
        aboutUs.missionEn = missionEn;
        aboutUs.aboutUsHi = aboutUsHi;
        aboutUs.visionHi = visionHi;
        aboutUs.missionHi = missionHi;

        await aboutUs.save();
        res.status(201).json(aboutUs);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteAboutUs = async (req, res) => {
    try {
        await AboutUs.deleteOne();
        res.status(200).json({ message: 'About Us content deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};