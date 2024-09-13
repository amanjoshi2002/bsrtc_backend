const Policy = require('../models/Policy');

exports.getPolicies = async (req, res) => {
    try {
        const policies = await Policy.find();
        res.json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPolicy = async (req, res) => {
    const { name, content } = req.body;

    const policy = new Policy({
        name,
        content
    });

    try {
        const newPolicy = await policy.save();
        res.status(201).json(newPolicy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updatePolicy = async (req, res) => {
    const { id } = req.params;
    const { name, content } = req.body;

    try {
        const policy = await Policy.findById(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        policy.name = name;
        policy.content = content;

        const updatedPolicy = await policy.save();
        res.status(200).json(updatedPolicy);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deletePolicy = async (req, res) => {
    const { id } = req.params;

    try {
        const policy = await Policy.findById(id);
        if (!policy) {
            return res.status(404).json({ message: 'Policy not found' });
        }

        await policy.remove();
        res.status(200).json({ message: 'Policy deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};