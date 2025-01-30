const express = require("express");
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../middleware/ensureLoggedIn');

// All paths start with '/api/jobs

// CREATE
router.post('/:jobId/reviews', reviewsCtrl.create);


module.exports = router;