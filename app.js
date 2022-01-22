const express=require('express')

const app=express()

const userController=require('./controllers/userController')

const galleryController=require('./controllers/galleryController')

app.use('/user',userController)

app.use('/gallery',galleryController)

module.exports=app