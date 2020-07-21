const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'booking', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        booking_detail_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        user_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        owner_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        total: {
            type: Sequelize.FLOAT,
            required:true
        },
        discount: {
            type: Sequelize.FLOAT,
            required:true
        },
        status: {
            type: Sequelize.TINYINT,
            required:true
        },
    },    
    {
        timestamps: false
    }

)