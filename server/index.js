const express= require('express');
const app = express();
const port = 8000;


app.require('./db/conn');
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
});