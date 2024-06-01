
const initialize = async (startupConfig) => {
  if(!startupConfig || startupConfig.startMysql){
    await initializeMysql();
  }
} 

const initializeMysql = async () => {
    await mysqlLib.initializeConnectionPool({
      host              : config.get('databaseSettings.host'),
      user              : config.get('databaseSettings.user'),
      password          : config.get('databaseSettings.password'),
      database          : config.get('databaseSettings.database'),
      port              : config.get('databaseSettings.mysqlPORT'),
      connectionLimit   : config.get('databaseSettings.connectionLimit'),
      multipleStatements: true
    });
    console.log(`mysql initialized`);
}

exports.initialize = initialize;