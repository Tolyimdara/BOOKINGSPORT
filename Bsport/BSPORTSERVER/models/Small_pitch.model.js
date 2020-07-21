const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'small_pitch', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        big_pitch_id: {
            type: Sequelize.INTEGER,
            required: true
        },
        
        name: {
            type: Sequelize.STRING,
            required: true
        },
        width: {
            type: Sequelize.FLOAT,
            required: true
        },
        height: {
            type: Sequelize.FLOAT,
            required: true
        },

        price: {
            type: Sequelize.FLOAT,
            required:true
        },
    },    
    {
        timestamps: false
    }

)