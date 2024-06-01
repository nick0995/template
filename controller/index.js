const router = require('express')();

router.use('/bcg', require('./bcg-controller').router);

module.exports = router;
