const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootCampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'name can not be more than 50 char'],
  },
  slug: String,
  website: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid url with http or https',
    ],
  },
  phone: {
    type: String,
    maxlength: [20, 'phone number can not be longer than 20 charecter'],
  },
  email: {
    type: String,
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email',
    ],
  },
  address: {
    type: String,
    required: [true, 'please add an address '],
  },
  location: {
    // Geojson
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dspre',
    },
    formattAddress: String,
    street: String,
    state: String,
    country: String,
    city: String,
    zipcode: String,
  },
  careers: {
    type: [String],
    required: true,
    enum: [
      'Web Development',
      'Mobile Development',
      'UI/UX',
      'Data Science',
      'Business',
      'Other',
    ],
  },
  averageRating: {
    type: Number,
    min: [1, 'Rating must be atleast 1'],
    max: [10, 'Rating can not be more than 10'],
  },
  averagecost: Number,
  photo: {
    type: String,
    default: 'no-photo.jpg',
  },
  housing: {
    type: Boolean,
    default: false,
  },
  jobAssistance: {
    type: Boolean,
    default: false,
  },
  jobGuarantee: {
    type: Boolean,
    default: false,
  },
  acceptGi: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  // user: {
  //   type: mongoose.Schema.ObjectId,
  //   ref: 'User',
  //   required: true,
  // },
});

// slugify name field
BootCampSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// goecode and create location field
BootCampSchema.pre('save', async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].latitude, loc[0].longitude],
    formattAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    state: loc[0].state,
    country: loc[0].countryCode,
    city: loc[0].city,
    zipcode: loc[0].zipcode,
  };

  // donot save address in db
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Bootcamp', BootCampSchema);
