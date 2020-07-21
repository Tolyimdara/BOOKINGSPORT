const express = require("express")
const booking_details = express.Router()
const Sequelize = require("sequelize")
const cors = require('cors')

const Booking_detail = require("../models/Booking_detail.model")
booking_details.use(cors())

process.env.SECRET_KEY = 'secret'

booking_details.get('/', (req,res) => {
    var date = req.body.date;
    return res.json({status: "success",today: new Date(),datee:date,test:"test"})
})

booking_details.post('/booking', (req, res) => {
    const today = req.body.date;
    const start = req.body.start_time;
    const end = req.body.end_time ;

    const bookingDetail = {
        size:req.body.size,
        date:today,
        start_time: start,
        end_time: end,
        total_price: req.body.total_price,
    }
    const {gt, lt} = Sequelize.Op;
    Booking_detail.findOne({
        where: {
            start_time: {
              [gt]: start
            },
            start_time: {
              [lt]: start

            },
            end_time: {
              [gt]: end
            },
            end_time: {
              [lt]: end
            },
            date:today,
          }
    })
    .then(bookingData => {
        if(!bookingData){

            Booking_detail.create(bookingDetail)
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




booking_details.post('/bookings',(req,res)=>{
    Booking_detail.findAll()
    .then(booking_detail => {
        res.json({booking_detail:booking_detail})
    })
    .catch(err=>{
        console.log(err)
    })
})
booking_details.post('/select',(req,res)=>{
    Booking_detail.findOne({
        where:{
            id:req.body.id,
        }
    })
    .then(booking_detail => {
        res.json({booking_detail:booking_detail})
    })
    .catch(err=>{
        console.log(err)
    })
})
const Op = Sequelize.Op
booking_details.post('/dates',(req,res)=>{
    var ids=[];
    for(var key in req.body) {
        // ids[ids.length]=req.body[key]  
        ids.push(req.body[key]);
    }

    //   console.log(req.body);
      console.log(ids[0]);
      console.log('ids'+typeof(ids));
      
      
    Booking_detail.findAll({
        attributes: ['id','date','start_time','end_time'],
        where:{

            id:{
                [Op.in]:ids
            }
            
        }
    })
    .then(booking_detail => {
        res.json(booking_detail)
    })
    .catch(err=>{
        console.log(err)
    })
})
booking_details.post('/user_dates',(req,res)=>{
    var ids=[];
    for(var key in req.body) {
        // ids[ids.length]=req.body[key]  
        ids.push(req.body[key]);
    }

      console.log(req.body);
      console.log(ids);
      
      
    Booking_detail.findAll({
        attributes: ['id','date','start_time','end_time'],
        where:{

            id:{
                [Op.in]:ids
            }
        }
    })
    .then(booking_detail => {
        res.json(booking_detail)
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = booking_details