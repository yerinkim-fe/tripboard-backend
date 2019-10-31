const User = require('../../models/User');

const signUpValidator = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      return res.status(409).json({
        message: 'Requested user already exists'
      });
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: 'invalid user'
    });
  }
}

exports.signUpValidator = signUpValidator;
