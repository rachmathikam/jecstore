import { Sequelize,QueryTypes } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;


const Product = db.define('products' ,{
    nama:{
        type: DataTypes.STRING
    },
    harga:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

export default Product;