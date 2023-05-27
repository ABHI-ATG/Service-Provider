
const express= require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const router = require('./router/route');

/**Database connection */
require('dotenv').config();
require('./db/conn');


const port = process.env.PORT;

/**middleware */
app.use(express.json());
app.use(cors());//used for connection with react
app.disable('x-powered-by'); // less hackers know about our stack
app.use(morgan('tiny'));//HTTP request miidle ware logger

/** HTTP GET Request */
app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});


/** api routes */
app.use('/api', router);

console.log("oh");

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});