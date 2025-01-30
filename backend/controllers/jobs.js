const Job = require('../models/job');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
// Ensure that the .env contains the following keys
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;

module.exports = {
  createJob,
  indexJob,
  showJob,
  updateJob,
  deleteJob,
};

// TODO: Admins needs to be able to see all jobs and decide if displayInGallery = T/F
async function indexJob(req, res) {
  try {
    const jobs = await Job.find({ displayInGallery: true });
    res.status(200).json(jobs);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// TODO: displayInGallery is always true - might need to change
async function createJob(req, res) {
  try {
    req.body.owner = req.user._id;
    if (req.file) {
      req.body.photo = await uploadFile(req.file);
    }
     // Check permissions:
     if (req.user.isAdmin === false) {
      return res.status(403).json({ error: "You're not allowed to do that!" });
    }
    const job = await Job.create(req.body);
    res.json(job);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Job Failed' });
  }
};

async function showJob(req, res) {
  try {
    const job = await Job.findById(req.params.jobId).populate({
      path: "reviews",
      populate: {
        path: "owner",
        select: "firstName lastName",
      },
    });
    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

// TODO: ensure isAdmin permission to update
async function updateJob(req, res) {
  try {

    // Find the job:
    const job = await Job.findById(req.params.jobId);

    // Check permissions:
    if (req.user.isAdmin === false) {
      return res.status(403).json({ error: "You're not allowed to do that!" });
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
};

// TODO: ensure isAdmin permission to delete
async function deleteJob(req, res) {
  try {
    const job = await Job.findById(req.params.jobId);

    // Check permissions:
    if (req.user.isAdmin === false) {
      return res.status(403).send("You're not allowed to do that!");
    }

    const deletedJob = await Job.findByIdAndDelete(req.params.jobId);
    res.status(200).json(deletedJob);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

async function uploadFile(file) {
  // Create an instance of the S3 client
  const s3Client = new S3Client({ region: S3_REGION });
  // s3's PutObjectCommand will expect an object with the following properties
  const s3Params = {
    Bucket: S3_BUCKET,
    // Create a unique filename to use as the S3 Key
    Key: `${Date.now()}-${file.originalname}`,
    // The uploaded file's binary content is held in the buffer property
    Body: file.buffer,
  };
  // Send the file to s3
  await s3Client.send(new PutObjectCommand(s3Params));
  // Return the endpoint to download the file
  return `${S3_BASE_URL}/${S3_BUCKET}/${s3Params.Key}`;
}