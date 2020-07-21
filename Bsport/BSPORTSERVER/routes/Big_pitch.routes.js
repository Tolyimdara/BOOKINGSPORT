const express = require("express")
const big_pitchs = express.Router()
const cors = require('cors')

const Big_pitch = require("../models/Big_pitch.model")
big_pitchs.use(cors())

process.env.SECRET_KEY = 'secret'


big_pitchs.post('/admin/register',(req,res)=>{
    Big_pitch.create({
        pitch_data_id:req.body.pitch_data_id,
        name:req.body.name,
        width:req.body.width,
        height:req.body.height,
        price:req.body.price

    })
    .then(()=>{
        res.json({status:"success registerd"})
    })
    .catch((err)=>
         console.log(err)
    )

})


big_pitchs.post('/',(req,res)=>{
    Big_pitch.findOne({
        where: {
            pitch_data_id: req.body.pitch_data_id
        }
    })
    .then(big_pitch => {
        res.json({big_pitch:big_pitch})
    })
    .catch(err=>{
        console.log(err)
    })
})

module.exports = big_pitchs