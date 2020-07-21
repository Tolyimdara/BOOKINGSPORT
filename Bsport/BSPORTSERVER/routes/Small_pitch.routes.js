const express = require("express")
const small_pitchs = express.Router()
const cors = require('cors')

const Small_pitch = require("../models/Small_pitch.model")
small_pitchs.use(cors())

process.env.SECRET_KEY = 'secret'




small_pitchs.post('/admin/register',(req,res)=>{
    Small_pitch.create({
        big_pitch_id:req.body.big_pitch_id,
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

small_pitchs.post('/',(req,res)=>{
    Small_pitch.findOne({
        where:{
            big_pitch_id:req.body.big_pitch_id
        }
    })
    .then(small_pitch => {
        res.json({small_pitch:small_pitch})
    })
    .catch(err=>{
        console.log(err)
    })
})
    


module.exports = small_pitchs