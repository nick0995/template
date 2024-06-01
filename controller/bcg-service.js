const insuranceDao    = require('../dao/bcg-insurance-dao');
const { Response }       = require('../dto');

const bcgInsuranceData = async () => { 
  try {
    console.log('Service');
    let result= await insuranceDao.getInsuranceData();
    return (new Response(true, 'Get Insurance Data', { res: result.data }));
  } catch (error) {
    console.error('Error while fetching Data', error);
    throw error;
  }
}

const updateInsuranceData = async(req) => {
  try {
    let { policyData }      = req.body;
    let whereObj            = {}
    whereObj.policy_id      = policyData.policy_id;

    let result              = await insuranceDao.updateInsuranceData({whereObj});
    return (new Response(true,'Update Policy Details', { res : result.data }));
  } catch (error) {
    console.log('Error while updating policy Data');
    throw error;
  }
}



exports.bcgInsuranceData            = bcgInsuranceData;
exports.updateInsuranceData    = updateInsuranceData;