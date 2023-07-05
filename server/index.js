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
    res.status(200).json("Home GET Request");
});

const client=require('./routes/client');
const provider=require('./routes/provider');

app.use('/api/client',client);
app.use('/api/provider',provider);

const port = process.env.PORT;

const server=app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});


// const io=require('socket.io')(server,{
//     pingTimeout:60000,
//     cors:{
//       origin:"http://localhost:3000/"
//     }
// })

// io.on('connection',(socket)=>{
//     let userId;
//     console.log('a user connected')
//     socket.on('setup',(id)=>{
//         userId=id;
//     })

//     socket.on('disconnect',()=>{
//         socket.leave(userId);
//         console.log("user disconnected");
//     })
// })
