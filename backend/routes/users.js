const express = require('express');
const { getCurrentUser } = require('../controllers/users');
const router = express.Router();

// To see if current user.isAdmin === true
router.get('/', getCurrentUser);

module.exports = router;
