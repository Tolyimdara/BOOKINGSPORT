const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'owners', 
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        first_name: {
            type: Sequelize.STRING,
            required: true
        },
        last_name: {
            type: Sequelize.STRING,
            required:true
        },
        email: {
            type: Sequelize.STRING,
            required: true
        },
        password: {
            type: Sequelize.STRING,
             required: true 
        },
        phone_number: {
            type: Sequelize.STRING,
            required: true
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },    
        {
            timestamps: false
        }

)