const express = require("express")
const owners = express.Router()
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Owner = require("../models/Owner.model")
owners.use(cors())

process.env.SECRET_KEY = 'secret'
owners.post('/admin/register', (req, res) => {
    const today = new Date()
    const ownerData = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        phone_number: req.body.phone_number,
        created: today
    }

    Owner.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(owner => {
        if(!owner){
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                    ownerData.password = hash
                    Owner.create(ownerData)
                    .then(owner => {
                        res.json({status: 'success registered',
                                    ownerData:ownerData})
                                    
                    })
                    .catch(err=> {
                        res.send('error: ' + err)
                        console.log(err);
                    })
            } )

        }else{
            res.json({error: "Owner's email alreay exists"})
        }
    })
    .catch(err => {
        res.send('error: ' + err)
        console.log(err);
    })
})

owners.post('/login', (req, res)=>{

    Owner.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(owner => {
        if(owner){
            if(bcrypt.compareSync(req.body.password, owner.password)){
                let token = jwt.sign(owner.dataValues,process.env.SECRET_KEY,{
                    expiresIn: 1440
                })
                res.json({status: "success",owner})
            }
        }else{
            res.status(400).json({error: 'User does not exist'})  
        }
    })
    .catch(err=>{
        res.status(400).json({error:err})
    })
})
owners.get('/',(req,res)=>{
    Owner.findAll()
    .then(owner=>{
        res.json({owner:owner})
    })
    .catch(err=>{
        console.log(err)
    })
})


owners.post('/pitch',(req, res)=>{
    Owner.findOne({
        where: {
            id: req.body.OWNER_ID
        }
    })
    .then(owner => {
        res.json({owner:owner})
    })
    .catch(err =>{
        console.log(err)
    })
})



module.exports = owners