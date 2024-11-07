const Policy = require('../models/Policy');

exports.getPolicies = async (req, res) => {
    const { lang } = req.params;

    try {
        const policies = await Policy.find();
        const response = policies.map(policy => {
            return {
                name: lang === 'hi' ? policy.nameHi : policy.nameEn,
                content: lang === 'hi' ? policy.contentHi : policy.contentEn
            };
        });
        res.json(response);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createPolicy = async (req, res) => {
    const { nameEn, nameHi, contentEn, contentHi } = req.body;

    const policy = new Policy({
        nameEn,
        nameHi,
        contentEn,
        contentHi
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
        const existingPolicies = await Policy.find();
        const existingPolicyIds = existingPolicies.map(policy => policy._id.toString());

        const updatedPolicyIds = policies.map(policy => policy._id).filter(id => id);

        // Delete policies that are not in the updated list
        const policiesToDelete = existingPolicyIds.filter(id => !updatedPolicyIds.includes(id));
        await Policy.deleteMany({ _id: { $in: policiesToDelete } });

        // Update existing policies and create new ones
        for (const policyData of policies) {
            const { _id, nameEn, nameHi, contentEn, contentHi } = policyData;
            if (_id) {
                // Update existing policy
                const policy = await Policy.findById(_id);
                if (policy) {
                    policy.nameEn = nameEn;
                    policy.nameHi = nameHi;
                    policy.contentEn = contentEn;
                    policy.contentHi = contentHi;
                    await policy.save();
                }
            } else {
                // Create new policy
                const newPolicy = new Policy({ nameEn, nameHi, contentEn, contentHi });
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