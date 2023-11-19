const mongoose = require('mongoose')
const {Schema} =  mongoose


const userSchema = new Schema({
    username:{type:String,required:true,unique:true},
    password:{required:true,type:String}
})

const userModel = mongoose.model('userModel',userSchema)

module.exports = userModel