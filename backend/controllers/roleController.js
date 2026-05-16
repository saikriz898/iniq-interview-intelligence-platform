const Role = require('../models/Role');

exports.getAllRoles = async (req, res) => {
  try {
    const roles = await Role.find({ status: 'Active' }).sort({ name: 1 });
    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
};

exports.addRole = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const existing = await Role.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(200).json(existing); // Return existing instead of error
    }

    const role = new Role({ name, slug });
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add role' });
  }
};

exports.updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const update = { name, status };
    if (name) update.slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const role = await Role.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update role' });
  }
};

exports.deleteRole = async (req, res) => {
  try {
    const { id } = req.params;
    await Role.findByIdAndDelete(id);
    res.status(200).json({ message: 'Role deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
};
