const Job = require('../models/job');

module.exports = {
  createJob,
  indexJob,
  showJob,
}

async function indexJob(req, res) {
  try {
    const jobs = await Job.find({ displayInGallery: true });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function createJob(req, res) {
  try {
    req.body.owner = req.user._id;
    req.body.displayInGallery = true;
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Job Failed' });
  }
}

async function showJob(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}