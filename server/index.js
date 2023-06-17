const express= require('express');
const app = express();
const cors = require('cors');
const cookieParser=require('cookie-parser')

require('dotenv').config();

// /**Database connection */
require('./db/conn');



// /**middleware */
app.use(cookieParser())
app.use(express.json());
app.use(cors());

// app.use(function(req, res, next) {
//     res.header('Access-Control-Allow-Origin', 'hhtp://127.');
//     res.header(
//       'Access-Control-Allow-Headers',
//       'Origin, X-Requested-With, Content-Type, Accept'
//     );
//     next();
// }); 

app.get('/', (req, res) => {
    res.status(201).json("Home GET Request");
});

const client=require('./routes/client');
const provider=require('./routes/provider');

app.use('/api/client',client);
app.use('/api/provider',provider);

const port = process.env.PORT||8000;

app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});