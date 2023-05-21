const express= require('express');
const app = express();
const morgan = require('morgan');
const port = 8000;
const router = require('./router/route');

//const router= require('router');
const cors = require('cors');

/**Database connection */
require('./db/conn');

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

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});