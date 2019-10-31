const User = require('../../models/User');
const bcrypt = require('bcrypt');

const signInValidator = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        req.auth = {
          user_id: user._id
        }

        next();
      } else {
        return res.status(401).json({
          message: 'password incorrect'
        });
      }
    } else {
      res.status(400).json({
        message: 'invalid user'
      });
    }
  } catch (error) {
    next(error);
  }
}

exports.signInValidator = signInValidator;
