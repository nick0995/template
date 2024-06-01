const mysql         = require('mysql');

let connection;

const initializeConnectionPool = async ({
  host,
  user,
  password,
  database,
  port,
  connectionLimit,
  multipleStatements
}) => {
  console.log('mysql initializeConnectionPool');
  let connCount  = 0;
      connection = mysql.createPool({
    host,
    user,
    password,
    database,
    port,
    connectionLimit,
    multipleStatements
  });

  connection.on('connection', function (conn) {
    connCount++;
    console.log(`mysql connection event, connCount: ${connCount}`);
  });

  connection.on('acquire', function (conn) {
    console.log(`mysql acquire event, connCount: ${connCount}`);
  });

  connection.on('release', function (conn) {
    console.log(`mysql release event, connCount: ${connCount}`);
  });

  connection.on('error', function (err) {
    console.log(`mysql error event: ", err, " connCount: ${connCount}`);
  });

  connection.on('enqueue', function (err) {
    console.log(`mysql enqueue event : ", err, " connCount: ${connCount}`);
  });

  return connection;
};

const executeQuery = ({ queryString, params, event }) => {
  return new Promise((resolve, reject) => {
    let query = connection.query(queryString, params, function (err, res) {
      console.log(`executing mysql event: ${event} query: ${query.sql} err: ${JSON.stringify(err)} 
            res: ${JSON.stringify(res)} params: ${JSON.stringify(params)}`);
      if (err || !res) {
        console.log(`error executing mysql event  ${event} query  
                ${query.sql} err: ${JSON.stringify(err)} res ${JSON.stringify(
          res
        )}`);

        if (
          err.code == 'ER_LOCK_DEADLOCK' ||
          err.code == 'ER_QUERY_INTERRUPTED'
        ) {
          setTimeout(
            executeQuery.bind(null, { queryString, params, event }),
            50
          );
        } else {
          return reject({ error: err, query: query.sql, event: event });
        }
      }
      return resolve(res);
    });
  });
};

exports.initializeConnectionPool = initializeConnectionPool;
exports.executeQuery             = executeQuery;
