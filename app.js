const config                      = require('config');
const express                     = require('express');
const middlewares                 = require('./middlewares');
const connection_sql              = require('./util/connection');
const routes                      = require('./controller/index');
const exceptionHandler            = require('./middlewares/exception-handler');

const app                         = express();

app.use(middlewares.router); 
app.use('/', routes);
app.use(exceptionHandler);


app.listen(config.get('PORT'), () =>{
  console.log(`App listening at http://localhost:${config.get('PORT')}`)
})
let mysqlConnection = connection_sql.handleDisconnect({ startupLogger: false })

if (mysqlConnection) {
  console.log('Connected');
}

process.on('SIGTERM' , ()=>{
  console.log('closing the connection');
  app.close()
});

process.on('SIGINT' , ()=>{
  console.log('SIGINT closing the connection');
  app.close()
});

process.on('uncaughtException', (err) => {
  console.log(
    `whoops! uncaughtException' ${new Error(err.stack)}`
  );
  process.exit();
});
