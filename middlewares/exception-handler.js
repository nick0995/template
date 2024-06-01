const Response = require('../dto/Response');

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
  res.statusCode = 400;
  logger.error((err));
  res.send(new Response(false, err));
};
