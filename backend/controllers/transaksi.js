import Transaksi from "../models/transaksiModel.js";
import { QueryTypes } from "sequelize";

export const getAllTransaksi = async (req, res) => {
    try {

        const transaksi = await Transaksi.findAll();
        res.json(transaksi);
    }
    catch (e) {
        res.json({ message: e.message });
    }
}


export const createTransaksi = async (req, res) => {

    try {

        await Transaksi.create(req.body);

        res.json({
            "messages": "add Transaksi successfully!"
        });
    }
    catch (e) {
        res.json({
            "messages": "add Transaksi failed!"
        });
    }
}


export const getTransaksiById = async (req, res) => {

    try{

        const transaksi = await Transaksi.findOne({
            where: {
                id: req.params.id
            }
        });
    
        res.json(transaksi);
    }
    catch(e){

        res.json({
            message: "Data not Found"
        })
    }

}