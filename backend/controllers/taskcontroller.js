const Task = require("../models/Task");


// CREATE TASK
exports.createTask = async(req,res)=>{

try{

const task = await Task.create({

title:req.body.title,

description:req.body.description,

user:req.user

});


res.json(task);


}catch(error){

console.log(error);

res.status(500).json({
message:error.message
});

}

};




// GET TASKS
exports.getTasks = async(req,res)=>{

try{


const tasks = await Task.find({
user:req.user
});


res.json(tasks);


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// UPDATE TASK

exports.updateTask = async(req,res)=>{

try{


const task = await Task.findByIdAndUpdate(

req.params.id,

req.body,

{
new:true
}

);


res.json(task);


}catch(error){

res.status(500).json({
message:error.message
});

}

};




// DELETE TASK

exports.deleteTask = async(req,res)=>{

try{


await Task.findByIdAndDelete(
req.params.id
);


res.json({
message:"Deleted"
});


}catch(error){
console.log("CREATE TASK ERROR:",error);
res.status(500).json({
message:error.message
});

}

};