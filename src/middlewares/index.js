const http2Constants = require('http2').constants;
const axios = require('axios');
require('dotenv').config();

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const response = await axios.get(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/auth/verify`, {
      headers: {
        Authorization: token,
      },
    });
    if (response.status === http2Constants.HTTP_STATUS_OK) {
      next();
    }
  } catch (error) {
    res.status(http2Constants.HTTP_STATUS_UNAUTHORIZED).json({ error: 'JWT Token verification failed' });
  }
};

module.exports = { validateToken };