const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.create = async function (req, res, next) {
  const { email, name, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 12);

    await User.create({
      email,
      name,
      password: hash
    });

    return res.status(201).json({
      result: 'ok'
    });
  } catch (error) {
    next(error);
  }
};

exports.getToken = async function (req, res, next) {
  const { user_id } = req.auth;

  try {
    const payload = { user_id };
    const token = jwt.sign(payload, process.env.YOUR_SECRET_KEY, { expiresIn: '7d' });

    res.status(200).json({
      token
    });
  } catch (error) {
    next(error);
  }
};

exports.getUser = async function (req, res, next) {
  const { user_id } = req.auth;

  try {
    const user = await User.findOne({
      _id: user_id
    });

    const { email, name } = user;

    res.status(200).json({
      email,
      name
    });
  } catch {
    next(error);
  }
};
