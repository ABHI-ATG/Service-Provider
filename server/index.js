const express= require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const router=require('./router/route');
const cookeParser=require("cookie-parser");
require('dotenv').config();



// /**Database connection */
require('./db/conn');

const port = process.env.PORT;

// /**middleware */
app.use(cookeParser());
app.use(express.json());
app.use(cors());//used for connection with react
app.disable('x-powered-by'); // less hackers know about our stack
app.use(morgan('tiny'));//HTTP request middleware logger

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


app.use(router);

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});