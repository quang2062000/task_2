import express from 'express'
import appLogger from './middleware/appLogger';
import apiRouter from './router/apiRouter';
var mongoose = require('mongoose')
var cors = require('cors')
const app:express.Application = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/quiz_app')
.then(() => {
  console.log("Connected !!!")
})
.catch((err:any)=>{
  console.log(err)
})

const hostname :string = 'localhost';
const port : number = 3001;

app.use(appLogger)

app.use(cors({}))

app.use(express.json());
app.use(express.urlencoded({extended:false}))

app.get('/',(req:express.Request,res:express.Response)=>{
    res.status(200).send(`<h3>Hien thi du lieu</h3>`)
})


// router configuration
app.use('/api',apiRouter)

app.listen(port,hostname,()=>{
    console.log(`Express server started at http://${hostname}:${port}`)
})
