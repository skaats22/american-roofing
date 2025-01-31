const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { S3_REGION, S3_BUCKET, S3_BASE_URL } = process.env;
const Quote = require('../models/quote');

module.exports = {
  createQuote,
  indexQuote,
  showQuote,
  deleteQuote,
  uploadFile,
}


async function indexQuote(req, res) {
  try {
    const quotes = await Quote.find({});
    res.status(200).json(quotes);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function createQuote(req, res) {
  try {
    req.body.owner = req.user._id;
    // Multer middleware will add a file property to the req object
    if (req.file) {
      req.body.photo = await uploadFile(req.file);
    }
    const quote = await Quote.create(req.body);
    res.json(quote);
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: 'Create Quote Failed' });
  }
}

async function showQuote(req, res) {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    res.status(200).json(quote);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
}

async function deleteQuote(req, res) {
  try {
    const quote = await Quote.findById(req.params.quoteId);
    const deletedQuote = await Quote.findByIdAndDelete(req.params.quoteId);
    res.status(200).json(deletedQuote);
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
    Key: `${Date.now()}-${file.originalname.replaceAll(' ', '')}`,
    // The uploaded file's binary content is held in the buffer property
    Body: file.buffer,
  };
  // Send the file to s3
  await s3Client.send(new PutObjectCommand(s3Params));
  // Return the endpoint to download the file
  return `${S3_BASE_URL}/${S3_BUCKET}/${s3Params.Key}`;
}