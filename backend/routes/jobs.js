const express = require('express');
const router = express.Router();
const jobsCtrl = require('../controllers/jobs');

// All paths start with '/api/jobs'

// POST /api/jobs
router.post('/', jobsCtrl.createJob);

// GET /api/jobs
router.get('/', jobsCtrl.indexJob);

// GET /api/jobs/:jobId
router.get('/:jobId', jobsCtrl.showJob)


module.exports = router;