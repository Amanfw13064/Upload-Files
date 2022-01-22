const multer=require('multer')

const path=require('path')

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,path.join(__dirname,'../uploads'))
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+'-'+file.originalname)
    }

})

const fileFileter=(req,file,cb)=>{
    if(file.mimetype=='image/png'||file.mimetype=="image/jpeg")
    {
        cb(null,true)
    }else{
        cb(null,false)
    }
}

const upload=multer({
    storage:storage,
    fileFilter:fileFileter,
})
 
module.exports=upload