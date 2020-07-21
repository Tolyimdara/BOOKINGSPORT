 const Sequelize = require("sequelize")
const db = require("../database/db")

module.exports = db.sequelize.define(
    'users', 
    {
        user_id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: Sequelize.STRING,
            required: true
        },
        user_email: {
            type: Sequelize.STRING,
            required: true
        },
        user_password: {
            type: Sequelize.STRING,
             required: true 
        },
        user_phonenumber: {
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


