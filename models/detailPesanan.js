const { Sequelize, DataTypes} = require('sequelize')
require('dotenv').config()
const Pesanan = require('./pesanan')
const Menu = require('./menu')
const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`);

const DetailPesanan = sequelize.define('detail_pemesanan', {
    id_detail_pesanan:{
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    id_pesanan: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Pesanan,
            key: 'id_pesanan'
        }
    },
    id_menu: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Menu,
            key: 'id_menu'
        }
    },
    jumlah: {
        type: DataTypes.INTEGER(3),
        allowNull: false
    },
    total_harga_menu: {
        type: DataTypes.INTEGER(5),
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'detail_pemesanan',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

DetailPesanan.belongsTo(Menu, {
    foreignKey: 'id_menu',
    as: 'DataMenu'
})

DetailPesanan.belongsTo(Pesanan, {
    foreignKey: 'id_pesanan',
    as: 'DataPesanan'
})

module.exports = DetailPesanan