const express           = require('express');
const insuranceService        = require('./bcg-service');

const router = express.Router();

router.post('/updateInsuranceData',  async(req, res)=> {
  try {
    let result = await insuranceService.updateInsuranceData(req);
    res.send(result);
  } catch (error) {
    next(error);
  }
});

router.get('/getInsuranceData',  async(req, res)=> {
  try {
    let result = await insuranceService.bcgInsuranceData(req);
    res.send(result.data);
  } catch (error) {
    next(error);
  }
});


exports.router = router;
