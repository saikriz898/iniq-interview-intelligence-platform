const Company = require('../models/Company');

exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ status: 'Active' }).sort({ name: 1 });
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch companies' });
  }
};

exports.addCompany = async (req, res) => {
  try {
    const { name } = req.body;
    const slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');
    
    const existing = await Company.findOne({ name: { $regex: new RegExp(`^${name}$`, 'i') } });
    if (existing) {
      return res.status(200).json(existing); // Return existing instead of error
    }

    const company = new Company({ name, slug });
    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add company' });
  }
};

exports.updateCompany = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    const update = { name, status };
    if (name) update.slug = name.toLowerCase().replace(/[^a-z0-9]/g, '-');

    const company = await Company.findByIdAndUpdate(id, update, { new: true });
    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update company' });
  }
};

exports.deleteCompany = async (req, res) => {
  try {
    const { id } = req.params;
    await Company.findByIdAndDelete(id);
    res.status(200).json({ message: 'Company deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete company' });
  }
};
