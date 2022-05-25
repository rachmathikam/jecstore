import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const Transaksi = db.define('transactions',{

    name:{
        type: DataTypes.STRING
    },
    nominal:{
        type:DataTypes.INTEGER
    },
    type:{
        type:DataTypes.STRING
    },
},{
    freezeTableName: true
})

export default Transaksi;