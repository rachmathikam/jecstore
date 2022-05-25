import Product from "../models/productMOdel.js";
import { QueryTypes } from "sequelize";

export const getAllProducts = async (req , res) => {

    try{
        // const products = await Product.findAll(); // Menggunakan ORM
        const products = await Product.sequelize.query('SELECT * FROM products', //Menggunakan Query 
        {
              type: QueryTypes.SELECT
        })
        res.json(products);
    }catch(error){
        res.json({message: error.message});
    }
    // res.send('Welcome');
}



export const getAllProductsById = async (req , res) => {

    try{
        const products = await Product.findAll({
            where:{
                id:req.params.id
            }
        });
        if(products[0] == null){
            res.json({
                "message" : "product not found"
            })
        }
        else{

            res.json(products[0]);
        }
    }catch(error){
        res.json({message: error.message});
    }
    // res.send('Welcome');
}

export const createProduct = async (req, res) => {
    try{
        await Product.create(req.body);
        res.json({
            "messages" : "Product create successfully!"
        });
    }catch(error){
        res.json({message: error.message});
    }
}

export const updateProduct = async (req, res) => {
    try{
        await Product.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.json({
            "messages" : "Product update successfully!"
        });
    }catch(error){
        res.json({message: error.message});
    }
}

export const deleteProduct = async (req, res) => {
    try{
        await Product.destroy({
            where:{
                id:req.params.id
            }
        });
        res.json({
            "messages" : "Product delete successfully!"
        });
    }catch(error){
        res.json({message: error.message});
    }
}