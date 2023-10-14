const { Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()
const User = require('./user')
const Meja = require('./meja')
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const Reservasi = sequelize.define('reservasi', {
    id_reservasi:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    id_user:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: User,
            key: 'id_user'
        }
    },
    id_meja:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model:Meja,
            key: 'id_meja'
        }
    },
    tanggal_reservasi:{
        type: DataTypes.DATE,
        allowNull: true
    },
    jam_mulai:{
        type: DataTypes.TIME,
        allowNull: true
    },
    jam_selesai:{
        type: DataTypes.TIME,
        allowNull: true
    },
    jumlah_orang:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    keterangan:{
        type:DataTypes.STRING,
        allowNull: true
    },
    status:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE
    },
    updated_at:{
        type: DataTypes.DATE
    }
}, {
    tableName: 'reservasi',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = Reservasi