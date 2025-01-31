const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  comment: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
}
);

const jobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: [
      "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID",
      "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS",
      "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK",
      "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV",
      "WI", "WY",
    ],
    required: true,
  },
  propertyType: {
    type: String,
    enum: ["Commercial", "Residential", "Other"],
    required: true,
  },
  serviceType: {
    type: String,
    enum: ["Repair", "Replace", "New Roof", "Maintenance", "Other"],
    required: true,
  },
  roofMaterial: {
    type: String,
    enum: ["Shingles", "Metal", "Tile", "Flat", "Other"],
    required: true,
  },
  projectPrice: {
    type: String,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: 'https://i.imgur.com/KTEjbsw.png',
  },
  displayInGallery: {
    type: Boolean,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reviews: [reviewSchema],
},
  {
    timestamps: true,
  }
);


module.exports = mongoose.model('Job', jobSchema);