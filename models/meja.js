const { Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Meja = sequelize.define('meja', {
    id_meja:{
        type: DataTypes.INTEGER,
        allowNull:false,
        primaryKey: true,
        autoIncrement: true
    },
    nomor_meja:{
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    foto_meja:{
        type: DataTypes.STRING,
        allowNull: false
    },
    jumlah_kursi:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE
    },
    updated_at:{
        type: DataTypes.DATE
    }
}, {
    tableName: 'meja',
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports =Meja