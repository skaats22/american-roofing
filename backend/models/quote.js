const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quoteSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
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
  zipCode: {
    type: String,
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
    enum: ["Shingles", "Metal", "Tile", "Flat", "Other", "Not Sure"],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false,
    default: 'https://i.imgur.com/KTEjbsw.png',
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
},
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Quote', quoteSchema);