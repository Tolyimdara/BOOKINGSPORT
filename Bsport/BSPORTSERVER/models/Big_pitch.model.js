const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'big_pitch', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        pitch_data_id: {
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