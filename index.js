const express = require('express');
const RouterApi = require('./routes');
const Cors = require('cors');
const {logErrors,errorHandler,boomErrorHandler} = require('./midlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const whiteList = ['http://localhost:5500','https://myDomain.co'];
const options ={
  origins:(origin,callback)=>{
    if (whiteList.includes(origin)) {
      callback(null,true);
    }else{
      callback(new Error('No permitido'));
    }
  }
}

app.use(Cors(options));
app.get('/api',(req,res)=>{
  res.send('http://localhost:3000');
});

RouterApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);
//
app.listen(port,()=>console.log('Escuchando en el puerto: ' + port));

