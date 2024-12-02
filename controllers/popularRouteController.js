const PopularRoute = require('../models/PopularRoute');

exports.getPopularRoutes = async (req, res) => {
    try {
        const routes = await PopularRoute.find();
        res.json(routes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPopularRoute = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { from, to, title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Remove validation for specific places
    // if (!['Place A', 'Place B'].includes(from) || !['Place A', 'Place B'].includes(to)) {
    //     console.log('Invalid route:', from, to);
    //     return res.status(400).json({ message: 'Routes must be between Place A and Place B' });
    // }

    const popularRoute = new PopularRoute({
        from,
        to,
        title,
        imageUrl
    });

    try {
        const newRoute = await popularRoute.save();
        console.log('New Route Created:', newRoute);
        res.status(201).json(newRoute);
    } catch (err) {
        console.log('Error Saving Route:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.updatePopularRoute = async (req, res) => {
    console.log('Request Body:', req.body);
    console.log('Request File:', req.file);

    const { id } = req.params;
    const { from, to, title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        const route = await PopularRoute.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        route.from = from;
        route.to = to;
        route.title = title;
        if (imageUrl) {
            route.imageUrl = imageUrl;
        }

        const updatedRoute = await route.save();
        res.status(200).json(updatedRoute);
    } catch (err) {
        console.log('Error Updating Route:', err.message);
        res.status(400).json({ message: err.message });
    }
};

exports.deletePopularRoute = async (req, res) => {
    const { id } = req.params;

    try {
        const route = await PopularRoute.findById(id);
        if (!route) {
            return res.status(404).json({ message: 'Route not found' });
        }

        await PopularRoute.deleteOne({ _id: id });
        res.status(200).json({ message: 'Route deleted' });
    } catch (err) {
        console.log('Error Deleting Route:', err.message);
        res.status(500).json({ message: err.message });
    }
};