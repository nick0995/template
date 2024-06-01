const { executeQuery } = require('../lib/mysql');
const { Response }     = require('../dto');

const getInsuranceData = async({fields}) =>{
  try {
    fields      = fields || '*';
    let params      = [];
    let queryString = `SELECT ${fields} FROM bcg_insurance WHERE 1`;

    const dbQuery = {
      queryString,
      params,
      event: 'getInsuranceData'
    };

    const result = await executeQuery(dbQuery);

    return (new Response(true, 'Get Data', { result }));
  } catch (e) {
    console.log(`Error in getInsuranceData dao opts ${e}`);
    throw e;
  }
}

const updateInsuranceData = async({ whereObj, setObj }) =>{
  try {
    let emptyWhere  = false;
    fields      = fields || '*';
    let params      = [];
    let queryString = `UPDATE bcg_insurance SET ? WHERE ?`;

    if (!whereObj && !whereObj.policy_id) {
      throw Error('Where clause is missing');
    }

    const dbQuery = {
      queryString,
      params      : [setObj, whereObj],
      event       : 'updateInsuranceData'
    };

    const result = await executeQuery(dbQuery);

    return (new Response(true, 'Update Data', { result }));
  } catch (e) {
    console.log(`Error in updateInsuranceData dao opts ${e}`);
    throw e;
  }
}

exports.getInsuranceData    = getInsuranceData;
exports.updateInsuranceData = updateInsuranceData;
