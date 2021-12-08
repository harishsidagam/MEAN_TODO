const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post:{
        type:String,
        required:true
    }
});
const todo = mongoose.model('todo',postSchema)
module.exports=todo;