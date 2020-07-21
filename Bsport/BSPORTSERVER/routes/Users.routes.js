const express = require("express")
const users = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Op = require('sequelize').Op

const User = require("../models/User.model")
users.use(cors())

process.env.SECRET_KEY = 'secret'
users.post('/register', (req, res) => {
    const today = new Date()
    const userData = {
        user_id:req.body.user_id,
        username:req.body.username,
        user_email: req.body.user_email,
        user_password: req.body.user_password,
        user_phonenumber: req.body.user_phonenumber,
        created: today
    }
 
    User.findOne({
        where: {
            user_email: req.body.user_email
        }
    })
    .then(user => {
        if(!user){
            bcrypt.hash(req.body.user_password, 10, (err, hash) => {
                    userData.user_password = hash
                    User.create(userData)
                    .then(user => {
                        res.json({status: "success",userData})
                                    
                    })
                    .catch(err=> {
                        res.send('error: ' + err)
                        console.log(err);
                    })
            } )

        }else{
            res.json({error: "User's email alreay exists"})
        }
    })
    .catch(err => {
        res.send('error:' + err)
        console.log(err);
    })
})

users.post('/login', (req, res)=>{

    User.findOne({
        where: {
            user_email: req.body.user_email
        }
    })
    .then(user => {
        if(user){
            if(bcrypt.compareSync(req.body.user_password, user.user_password)){
                let token = jwt.sign(user.dataValues,process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                res.json({status: "success",user})
            }
        }else{
            res.status(400).json({status: 'User does not exist'})  
        }
    })
    .catch(err=>{
        res.status(400).json({error:err})
    })
})


users.post('/infos',(req,res)=>{

    var ids=[];
    for(var key in req.body) {
        // if(req.body.hasOwnProperty(key)){
            ids[ids.length]=req.body[key]
        // }
      }
      console.log(req.body);
      console.log(ids);
      
      
    
    User.findAll({
        attributes: ['user_id','username','user_phonenumber'],
        where:{

            user_id:{
                [Op.in]:ids
            }
            
        }
    })
    .then(user=>{
       
        res.json(user)
    })
    .catch(err=>{
        console.log(err)
    })
})
users.post('/info',(req,res)=>{

    User.findOne({
        attributes: ['user_id','username','user_phonenumber'],
        where:{

            user_id:req.body.user_id
            
        }
    })
    .then(user=>{
       
        res.json(user)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = users