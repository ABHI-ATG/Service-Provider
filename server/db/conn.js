const  mongoose= require('mongoose');

const DB= 'mongodb+srv://Servicely:Project123@cluster0.jckugsx.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(DB).then(()=>{
  console.log(`DB connected`);
}).catch((err)=>{
  console.log(err);
})

