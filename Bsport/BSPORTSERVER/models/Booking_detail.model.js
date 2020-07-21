const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'booking_detail', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        size: {
            type: Sequelize.INTEGER,
            required: true
        },
        
        date: {
            type: Sequelize.DATE,
            required: true
        },
        start_time: {
            type: Sequelize.TIME,
            required: true
        },
        end_time: {
            type: Sequelize.TIME,
            required: true
        },

        total_price: {
            type: Sequelize.FLOAT,
            required:true
        },
    },    
    {
        timestamps: false
    }

)