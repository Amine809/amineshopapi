const express=require('express');
const app=express();
const mongoose=require('mongoose');
const morgan=require('morgan');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const cors=require('cors')
const expressValidator=require('express-validator');
//import routes
const authRoutes=require('./routes/auth')
const userRoutes=require('./routes/user')
const categoryRoutes=require('./routes/category')
const productRoutes=require('./routes/product')
mongoose.connect('mongodb://localhost/playground')
.then(()=>console.log("connected to mongodb..."))
.catch(()=>console.error("could not connect to mongodb"))


//set config
require('dotenv').config()
//middlewares
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());
//first route
app.get('/',(req,res)=>{
    res.send("this my first heroku app")
})
//hello world 
app.get('/api',(req,res)=>{
    res.send("hello world")
})
//routes middleware
app.use('/api',authRoutes);
app.use('/api',userRoutes);
app.use('/api',categoryRoutes);
app.use('/api',productRoutes);

const port =process.env.PORT||8000;
app.listen(port,()=>{
    console.log(`server start at port ${port}`);
})