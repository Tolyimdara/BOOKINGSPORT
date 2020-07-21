const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'pitch_data', 
    {
        ID: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        OWNER_ID: {
            type: Sequelize.INTEGER,
            required: true
        },
        
        PICTURE: {
            type: Sequelize.INTEGER,
            required: true
        },
        START_TIME: {
            type: Sequelize.STRING,
            required: true
        },
        END_TIME: {
            type: Sequelize.STRING,
            required: true
        },

        NAME: {
            type: Sequelize.STRING,
            required:true
        },
        LOCATION: {
            type: Sequelize.STRING,
            required: true
        },
        DESCRIPTION: {
            type: Sequelize.STRING,
            required: true
        },
    },    
    {
        timestamps: false
    }

)