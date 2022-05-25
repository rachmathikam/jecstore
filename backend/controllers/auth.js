import Users from "../models/usersModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {body, validationResult } from "express-validator";
import localStorage from 'localStorage'

export const getUsers = async(req,res) =>{
    try{
        const users = await Users.findAll({
            attributes:['id','username','name','email']
        });
        res.json(users)

    }catch(error){
        console.log(error)
    }
}

export const registerUser = async(req,res) =>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }
    const {id,username,name,email,password,confPassword} = req.body;
    if(password !== confPassword) return res.status(400).json({
        "errors" : "Password dan Confirm Password harus sama !"
    })
    const salt          = await bcrypt.genSalt(); //hash password
    const hashPassword  = await bcrypt.hash(password,salt) //hash password
    try{
        await Users.create({
            id: id,
            username : username,
            name    :name,
            email   :email,
            password:hashPassword
        });
        res.json({
            "messages" : "Register successfully!"
        });
    }
    catch(error)
    {
        res.json({
            "errors" : error
        });
    }
}

export const loginUser = async(req,res) =>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()[0].msg });
    }

    try{
        const user = await Users.findAll({
            where:{
                email:req.body.email
            }
        })

        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({
            "errors" : "Wrong Password!"
        });

        const userId        = user[0].id;
        const username      = user[0].username;
        const name          = user[0].name;
        const email         = user[0].email;
        const access_token  = jwt.sign({userId,username,name,email},process.env.ACCESS_TOKEN_SECRET,{
            expiresIn : '20s'
        });

        const refresh_token  = jwt.sign({userId,username,name,email},process.env.REFRESH_TOKEN_SECRET,{
            expiresIn : '1d'
        });
        await Users.update({refresh_token:refresh_token},{
            where:{
                id: userId
            }
        });
        localStorage.setItem('token',refresh_token);
        console.log(localStorage.getItem('token'));
        // res.cookie('refreshToken',refresh_token,{
        //     httpOnly:true,
        //     maxAge: 24 * 60 * 60 * 1000,
        //     secure:true 
        // })
        // console.log(req.cookies.refreshToken);
        res.json({access_token});
    }
    catch(error){
        res.status(404).json({
            "errors": "Email not registered!"
        })
    }
}

export const logoutUser = async(req,res) => {

    try{
        console.log(req.cookies.refreshToken);
        const refresh_token = localStorage.getItem('token');
        if(!refresh_token) return res.sendStatus(204);
        const users = await Users.findAll({
            where:{
                refresh_token: refresh_token
            }
        });
        if(!users[0]) return res.sendStatus(204);
        const userId = users[0].id;
        await Users.update({refresh_token:null},{
            where:{
                id:userId
            }
        });
        // res.clearCookie('refreshToken');
        localStorage.removeItem('token');
        console.log(localStorage.getItem('token'));
        return res.sendStatus(200)
    }
    catch(e){

    }
}