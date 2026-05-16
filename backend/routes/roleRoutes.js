const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', roleController.getAllRoles);
router.post('/', protect, admin, roleController.addRole);
router.put('/:id', protect, admin, roleController.updateRole);
router.delete('/:id', protect, admin, roleController.deleteRole);

module.exports = router;
