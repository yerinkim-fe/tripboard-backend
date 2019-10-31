const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
  const clientToken = req.headers['authorization'].split(' ')[1];

  jwt.verify(clientToken, process.env.YOUR_SECRET_KEY, function(err, decoded) {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).json({
          error: err.message
        });
      } else {
        res.status(401).json({
          error: 'token error'
        });
      }
    } else {
      req.auth = {
        user_id: decoded.user_id
      }

      next();
    }
  });
}

exports.verifyToken = verifyToken;
