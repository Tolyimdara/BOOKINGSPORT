var express = require("express")
var cors = require("cors")
var bodyParser = require("body-parser")
var app = express()
var port = process.env.PORT || 3000

app.unsubscribe(bodyParser.json())
app.use(cors())
app.use('/uploads',express.static('uploads'))
app.use(bodyParser.urlencoded({extended: false}))

// var Users = require('./routes/Users.js')
var Owners = require('./routes/Owners.routes')
var Users = require('./routes/Users.routes');
var Pitch_datas = require('./routes/Pitch_data.routes');
var Big_pitches = require('./routes/Big_pitch.routes');
var Small_pitches = require('./routes/Small_pitch.routes');
var Booking_details = require('./routes/Booking_detail.routes');
var Bookings = require('./routes/Booking.routes');


app.use('/owners', Owners)
app.use('/users',Users)
app.use('/pitch_data',Pitch_datas)
app.use('/big_pitch',Big_pitches)
app.use('/small_pitch',Small_pitches)
app.use('/booking_detail',Booking_details)
app.use('/booking',Bookings)



app.listen(port, () =>{
    console.log("Server is running on port: " + port)
})