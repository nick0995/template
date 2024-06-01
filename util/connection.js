const config          = require('config');
const mysql           = require('mysql');
const startupService  = require('../startup/startup');
const db_config       = {
  host              : config.get('databaseSettings.host'),
  user              : config.get('databaseSettings.user'),
  password          : config.get('databaseSettings.password'),
  database          : config.get('databaseSettings.database'),
  port              : config.get('databaseSettings.mysqlPORT'),
  multipleStatements: true,
  connectionLimit   : config.get('databaseSettings.connectionLimit')
};

var handleDisconnect = function (startupConfig) {
  if(!startupConfig){
    startupService.initialize();
  }
  let connCount  = 0;
  connection = mysql.createPool(db_config); // Recreate the connection, since

  connection.on('connection', function (conn) {
    connCount++;
    console.log(`connected to mysql`,conn);
  });

  connection.on('error', function (err) {
    console.log(`mysql error event: ", ${err}, " connCount: ${connCount}`);
    handleDisconnect();
  });

  return connection;
}

exports.handleDisconnect = handleDisconnect;