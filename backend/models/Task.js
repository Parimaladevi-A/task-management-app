const mongoose=require("mongoose");


const taskSchema=new mongoose.Schema({

title:String,

description:String,

status:{
type:String,
default:"Pending"
},


user:{
type:mongoose.Schema.Types.ObjectId,
ref:"User",
required:true
}


});


module.exports=mongoose.model("Task",taskSchema);