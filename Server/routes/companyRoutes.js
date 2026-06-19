const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', companyController.getAllCompanies);
router.post('/', protect, companyController.addCompany); // Users can add new companies
router.put('/:id', protect, admin, companyController.updateCompany);
router.delete('/:id', protect, admin, companyController.deleteCompany);

module.exports = router;
