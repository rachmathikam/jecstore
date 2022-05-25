import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } =  Sequelize;

const Users = db.define('users',{
    username:{
        type:DataTypes.STRING
    },
    name:{
        type:DataTypes.STRING
    },
    password:{
        type:DataTypes.STRING
    },
    email:{
        type:DataTypes.STRING
    },
    refresh_token:{
        type:DataTypes.TEXT
    },
    createdAt:{
        type:'TIMESTAMP'
    },
    updatedAt:{
        type:'TIMESTAMP'
    },
},{
    freezeTableName:true
})

export default Users;