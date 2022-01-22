const mongoose=require('mongoose')

const userScehma=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name:String,
    profile_pic:{type:String,required:true},
})

module.exports=mongoose.model('user',userScehma)