const express                               = require('express');
const router                                = express.Router();
const config                                = require('config');

const SECRET_KEY                            = config.get("bcgSharedSecret");

router.use(function (req, res, next) {
  const url = req.url.split("?")[0] //stripping off queryParams if any
  req.filteredUrl = url;
  if(req.headers['bcg-secret'] != SECRET_KEY){
    console.log(url, "blocked!! failed secret keycheck ", req.headers['su-crawler-secret']);
    return res.sendStatus(401);
  }
  next();
});

exports.router        = router;
