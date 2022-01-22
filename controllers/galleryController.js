const express=require('express')

const router=express.Router()

const Gallery=require('../models/galleryModel')

const upload=require('../middleware/upload')

const fs=require('fs')

router.post('',upload.array('pictures',5),async(req,res)=>{
    try{
        const filepaths=req.files.map((file)=>file.path)
        const item=await Gallery.create({
            pictures:filepaths,
            user_id:req.body.user_id,
        })
        return res.send(item)

    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('',async(req,res)=>{
    try{
        const item=await Gallery.find().populate('user_id').lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const item=await Gallery.findById(req.params.id).populate('user_id').lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id',upload.array('pictures',5),async(req,res)=>{
    try{
         const f=await Gallery.findById(req.params.id)
         const ft=f.pictures.length
         console.log("f",f)
         console.log("ft",ft)
         
         if(ft){
            for(let i=0;i<ft;i++)
            {      
            fs.unlink(f.pictures[i],(err)=>{
                if(err) console.log(err)
                else{
                    console.log('deleted',f.pictures[i])
                }
             })
            }  
         }
        const filepaths=req.files.map((file)=>file.path)
        const item=await Gallery.findByIdAndUpdate(req.params.id,({
            pictures:filepaths,
             user_id:req.body.user_id,
        }),{new:true}).lean().exec()

        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete('/:id',async(req,res)=>{
    try{
        const f=await Gallery.findById(req.params.id)
        for(let i=0;i<f.pictures.length;i++)
        {
            fs.unlink(f.pictures[i],(err)=>{
                if(err) console.log(err)
                else{
                    console.log('deleted',f.pictures[i])
                }
            })
        }
        const item =await Gallery.findByIdAndDelete(req.params.id)
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router