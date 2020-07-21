const express = require("express")
const pitch_datas = express.Router()
const cors = require('cors')
const Sequelize = require("sequelize")
const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({
    destination: function(req, file,cb){
      cb(null, 'uploads/');
  
    },
    filename: function(req,file,cb){
    
        cb(null, Date.now() + file.originalname); 
  
    }
  });
const fileFilter = (req,file,cb)=>{
  if(file.mimetype === 'image/jpeg' || file.mimetype ==='image/png'){
      cb(null,true)
  }else{
    cb(null,false)
  }
}
const upload = multer({
  storage: storage, 
  limits:{
  fileSize:1024 * 1024 * 5
},
  fileFilter:fileFilter
});


const Pitch_data = require("../models/Pitch_data.model")
pitch_datas.use(cors())

process.env.SECRET_KEY = 'secret'



pitch_datas.get('/',(req,res)=>{
    Pitch_data.findAll()
    .then(pitch_data=>{
        res.json({pitch_data:pitch_data})
    })
    .catch(err=>{
        console.log(err)
    })
})
pitch_datas.post('/admin/register',upload.single('PICTURE'),(req,res)=>{
    Pitch_data.create(
        {  
            OWNER_ID:req.body.OWNER_ID,
            PICTURE:req.file.path,
            START_TIME:req.body.START_TIME,
            END_TIME:req.body.END_TIME,
            NAME:req.body.NAME,
            LOCATION:req.body.LOCATION,
            DESCRIPTION:req.body.DESCRIPTION
        }
    )  
    .then(() => {
    res.json({
        status: 'success registered',
        })          
    })
    .catch(err=> {
        res.send('error: ' + err)
        console.log(err);
    })

})


pitch_datas.post('/owner',(req,res)=>{

    Pitch_data.findAll({
        
        where: {
            OWNER_ID: req.body.owner_id,
        }
    })
    .then(pitch_data=>{
        res.json({pitch_data:pitch_data})
    })
    .catch(err=>{
        console.log(err)
    })
})







const Op = Sequelize.Op

pitch_datas.post('/search',(req,res)=>{
    Pitch_data.findAll( {
        where:{
        NAME: {
          [Op.like]: '%'+req.body.NAME+'%'
        },}
    })
        .then(pitch_data => {
            res.json({pitch_data:pitch_data})
        })
        .catch(err=>{
            console.log(err)
        })
    })








module.exports = pitch_datas