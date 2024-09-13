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

exports.updatePolicies = async (req, res) => {
    const { policies } = req.body;

    try {
        for (const policyData of policies) {
            const { _id, name, content } = policyData;
            if (_id) {
                // Update existing policy
                const policy = await Policy.findById(_id);
                if (policy) {
                    policy.name = name;
                    policy.content = content;
                    await policy.save();
                }
            } else {
                // Create new policy
                const newPolicy = new Policy({ name, content });
                await newPolicy.save();
            }
        }
        res.status(200).json({ message: 'Policies updated successfully' });
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