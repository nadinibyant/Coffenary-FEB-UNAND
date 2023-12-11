const { Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()
const User = require('./user')
const Reservasi = require('./reservasi')
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Pesanan = sequelize.define('pesanan', {
    id_pesanan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    }, 
    id_user: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id_user'
        }
    },
    id_reservasi:{
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Reservasi,
            key: 'id_reservasi'
        }
    },
    total_harga: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'pesanan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Pesanan