const express=require('express')

const router=express.Router()

const upload=require('../middleware/upload')

const User=require('../models/userModel')

const fs=require('fs')

router.post('',upload.single('profile_pic'),async(req,res)=>{
    try{
        const item=await User.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path,
        })
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }  
})

router.get('',async(req,res)=>{
    try{
        const item=await User.find().lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.get('/:id',async(req,res)=>{
    try{
        const item=await User.findById(req.params.id).lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.patch('/:id',upload.single('profile_pic'),async(req,res)=>{
    try{
        const fileP=req.file.path;
        if(fileP){
            const f=await User.findById(req.params.id)
            console.log(f)
            console.log('Profl',f.profile_pic)
            fs.unlink(f.profile_pic,(err)=>{
                if(err) console.log(err)
                else{
                    console.log('deteted item',f.profile_pic)
                }
            })
        }
        const item=await User.findByIdAndUpdate(req.params.id,{
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            profile_pic:req.file.path,
        },{new:true}).lean().exec()

        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

router.delete('/:id',async(req,res)=>{

    try{
        const f=await User.findById(req.params.id)
        fs.unlink(f.profile_pic,(err)=>{
            if(err) console.log(err)
            else{
                console.log('deleted',f.profile_pic)
            }
        })
        const item=await User.findByIdAndDelete(req.params.id).lean().exec()
        return res.send(item)
    }catch(err){
        return res.status(500).send(err.message)
    }
})

module.exports=router