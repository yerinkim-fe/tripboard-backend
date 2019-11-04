const Trip = require('../../models/Trip');
const multer = require('multer');
const upload = require('../../upload');

exports.createTrip = async function (req, res, next) {
  const { user_id } = req.params;

  const { title, location, address, sdate, edate, pictures, description } = req.body;

  try {
    await Trip.create({
      title,
      location,
      address,
      sdate,
      edate,
      pictures,
      description,
      created_by: user_id
    });

    res.status(201).json({
      result: 'ok'
    });
  } catch (error) {
    next(error);
  }
};

exports.uploadFile = async function (req, res, next) {
  upload(req, res, function(err) {
    if (err instanceof multer.MulterError) {
      return next(err);
    } else if (err) {
      return next(err);
    }

    const photos = [];

    req.files.forEach(file => {
      photos.push(file.location);
    });

    res.status(200).json({
      photos
    });
  });
};
