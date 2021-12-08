const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        
    },
    email:{
        type:String,
        
    },
    password:{
        type:String,
        
    },
    isVerified:{
        type:Boolean,
        default:false
    }
});

module.exports=mongoose.model('user',userSchema);


