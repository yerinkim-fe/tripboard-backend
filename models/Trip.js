const mongoose = require('mongoose');
const { Types } = mongoose.Schema;

const tripSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  address: {
    country: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    }
  },
  sdate: {
    type: Date,
    required: true
  },
  edate: {
    type: Date,
    required: true
  },
  pictures: [{
    url: {
      type: String,
      required: true
    }
  }],
  description: {
    type: String,
  },
  created_by: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  }
});

module.exports = mongoose.model('Trip', tripSchema);
