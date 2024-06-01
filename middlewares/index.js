const express                         = require('express');
const router                          = express.Router();
const cookieParser                    = require('cookie-parser');
const compression                     = require('compression');
const bodyParser                      = require('body-parser');

const secretKeyAuth                   = require('./secret-key-auth');

console.log("Loading middlewares");


router.use((req, res, next) =>  {
  res.setHeader('Cache-Control', 'no-cache, no-store');
  res.setHeader('pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('X-XSS-Protection', '1;');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

router.use(compression());
router.use(bodyParser.json({ limit: '5mb' }), (err, req, res, next) => {
  if (err) {
    console.log('Invalid Request data');
    console.log(`Headers:  ${JSON.stringify(req.headers)}`);
    console.log(err);
    res.status(406).send('Invalid Request data');
  } else {
    next();
  }
});
router.use(cookieParser());

router.use(secretKeyAuth.router);

exports.router = router;



