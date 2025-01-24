const express = require('express');
const router = express.Router();
const jobsCtrl = require('../controllers/jobs');

// All paths start with '/api/posts'

// POST /api/posts
router.post('/', jobsCtrl.createJob);
// GET /api/posts
router.get('/', jobsCtrl.indexJob);

module.exports = router;