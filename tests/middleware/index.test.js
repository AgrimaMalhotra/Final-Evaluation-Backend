const http2Constants = require('http2').constants;
const axios = require('axios');
const { validateToken } = require('../../src/middlewares/index');

jest.mock('axios');

describe('validateToken', () => {
  const req = {
    headers: {},
  };
  const res = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  };
  const next = jest.fn();

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call next() when token is valid', async () => {
    const token = 'valid-token';
    axios.get.mockResolvedValueOnce({
      status: http2Constants.HTTP_STATUS_OK,
    });
    req.headers.authorization = token;
    await validateToken(req, res, next);
    expect(axios.get).toHaveBeenCalledWith(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/auth/verify`, {
      headers: {
        Authorization: token,
      },
    });
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });

  it('should return HTTP_STATUS_UNAUTHORIZED when token is invalid', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const token = 'invalid-token';
    const errorMessage = 'JWT Token verification failed';
    axios.get.mockRejectedValueOnce({
      response: {
        status: http2Constants.HTTP_STATUS_UNAUTHORIZED,
      },
    });
    req.headers.authorization = token;
    await validateToken(req, res, next);
    expect(axios.get).toHaveBeenCalledWith(`http://${process.env.AUTH_HOST}:${process.env.AUTH_PORT}/auth/verify`, {
      headers: {
        Authorization: token,
      },
    });
    expect(next).not.toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(http2Constants.HTTP_STATUS_UNAUTHORIZED);
    expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
  });
});
