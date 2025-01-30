const express = require('express');
const router = express.Router();
const jobsCtrl = require('../controllers/jobs');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/jobs'

// GET /api/jobs
router.get('/', jobsCtrl.indexJob);

// GET /api/jobs/:jobId
router.get('/:jobId', jobsCtrl.showJob)

// POST /api/jobs
router.post('/', ensureLoggedIn, jobsCtrl.createJob);

// PUT /api/jobs/:jobId
router.put('/:jobId', ensureLoggedIn, jobsCtrl.updateJob)

// DELETE /api/jobs/:jobId
router.delete('/:jobId', ensureLoggedIn, jobsCtrl.deleteJob)



module.exports = router;