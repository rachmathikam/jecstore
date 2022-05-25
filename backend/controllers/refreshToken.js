import Users from "../models/usersModel.js";
import jwt from "jsonwebtoken";
import localStorage from 'localStorage'

export const resfreshToken = async(req, res) => {
    try{
        console.log(req.cookies.refreshToken);
        // const refresh_token = req.cookies.refreshToken; 
        const refresh_token =localStorage.getItem('token');
        if(!refresh_token) return res.sendStatus(401);
        const users = await Users.findAll({
            where:{
                refresh_token: refresh_token
            }
        });
        if(!users[0]) return res.sendStatus(403);
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET,(err,decode) => {
            if(err) return res.sendStatus(403);
            const userId        = users[0].id;
            const username      = users[0].username;
            const name          = users[0].name;
            const email         = users[0].email;
            const access_token  = jwt.sign({userId,username,name,email},process.env.ACCESS_TOKEN_SECRET,{
                expiresIn : '20s'
            });
            res.json({access_token})
        })
    }
    catch(error){
        console.log(error)
    }
}