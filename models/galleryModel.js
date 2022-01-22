const mongoose=require('mongoose')

const gallerySchema=new mongoose.Schema({
    pictures:[{type:String,required:true}],
    user_id:{type:mongoose.Schema.Types.ObjectId,ref:('user'),required:true},
})

module.exports=mongoose.model('gallery',gallerySchema)
