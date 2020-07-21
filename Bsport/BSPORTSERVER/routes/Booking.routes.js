const express = require("express")
const bookings = express.Router()
const Sequelize = require("sequelize")
const cors = require('cors')

const Bookings = require("../models/Booking.model")
bookings.use(cors())

process.env.SECRET_KEY = 'secret'


bookings.post('/create', (req, res) => {
   
    const bookingDetail = {
        booking_detail_id:req.body.booking_detail_id,
        user_id:req.body.user_id,
        owner_id:req.body.owner_id,
        total: req.body.total,
        discount: req.body.discount,
    }
    Bookings.findOne({
        where:{
            booking_detail_id:req.body.booking_detail_id,
        }
    })
    .then(booking => {
        if(!booking){
            Bookings.create(bookingDetail)
            .then(bookingData => {
                res.json({status: "success",bookingData})
            })
            .catch(err=> {
                res.send('erro create new table: ' + err)
                console.log(err);
            })
        }else{
            res.json({error: "Already Booked"})
        }
    })
    .catch(err => {
        res.send('error condition:' + err)
        console.log(err);
    })
})

bookings.post('/user_check',(req,res)=>{
    Bookings.findAll({
        where:{
            user_id:req.body.user_id,
        }
    })
    .then(booking => {
        res.json({booking:booking})
    })
    .catch(err=>{
        console.log(err)
    })
})
bookings.post('/',(req,res)=>{
    Bookings.findAll({
        where:{
            owner_id:req.body.owner_id,
            status:0
        }
    })
    .then(booking => {
        res.json({booking:booking})
    })
    .catch(err=>{
        console.log(err)
    })
})
bookings.post('/confirmed',(req,res)=>{
    Bookings.findAll({
        where:{
            owner_id:req.body.owner_id,
            status:1
        }
    })
    .then(booking => {
        res.json({booking:booking})
    })
    .catch(err=>{
        console.log(err)
    })
})



bookings.post('/get_comfirm',(req,res)=>{
    Bookings.findAll({
        where:{
            user_id:req.body.user_id
        },
        order: [
            ['date', 'DESC']
        ],
    })
    .then(booking => {
            res.json({booking:booking})
    })
    .catch(error =>{
        console.log(error);
    })


})


bookings.post('/confirm',(req,res)=>{
    Bookings.findOne({
            where:{
            id:req.body.id
            }
    })
    .then((status) => {  
        status.update({
            status:1
        })
        res.json({status:"success"})

    })
    .catch(err=>{
        console.log(err)
    })
})
module.exports = bookings