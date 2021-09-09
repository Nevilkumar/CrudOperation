const mongoose = require('mongoose');

let employeeSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    }
});

module.exports=mongoose.model('Employee', employeeSchema);