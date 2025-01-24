const Job = require('../models/job');

module.exports = {
  createJob,
  indexJob,
  showJob,
  updateJob,
  deleteJob,
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

// TODO: ensure isAdmin permission to update
async function updateJob(req, res) {
  try {
    // Find the job:
    const job = await Job.findById(req.params.jobId);

    // Check permissions:
    if (job.owner.isAdmin === false) {
      return res.status(403).send("You're not allowed to do that!");
    }

    // Update job:
    const updatedJob = await Job.findByIdAndUpdate(
      req.params.jobId,
      req.body,
      { new: true }
    );

    // Issue JSON response:
    res.status(200).json(updatedJob);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

// TODO: ensure isAdmin permission to delete
async function deleteJob(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);

    // Check permissions:
    if (job.owner.isAdmin === false) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json(deletedJob);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}