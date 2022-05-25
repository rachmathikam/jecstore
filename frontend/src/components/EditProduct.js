import React from 'react'
import { useState ,useEffect} from 'react';
import axios from 'axios';
import { useHistory, Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2'

const EditProduct = () => {

    const [nama,setNama]    = useState('');
    const [harga,setHarga]  = useState('');
    const history           = useHistory();
    const {id}              = useParams();

    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.put(`http://localhost:5000/products/${id}`,{
            nama: nama,
            harga: harga
        });
        Swal.fire({
            title: 'Data updated successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
                history.push('/')
            }
          })
    }

    useEffect(() => {
        getProductsByid();
    },[]);

    const getProductsByid = async () => {
        const result = await axios.get(`http://localhost:5000/products/${id}`);
        console.log(result.data);
        setNama(result.data.nama);
        setHarga(result.data.harga);
    }

  return (
    <div>
        <form onSubmit={ saveProduct }>
            <div className="field">
                <label className="label">Nama Product</label>
                <input class="input"
                    type="text"
                    placeholder="Input Nama Product"
                    value = { nama }
                    onChange={ (e) => setNama(e.target.value)}
                    required
                /> 
            </div>
            <div className="field">
                <label className="label">Harga Name</label>
                <input 
                    type="number" 
                    class="input"
                    placeholder="Input Harga Product" 
                    value={ harga }
                    onChange={ (e) => setHarga(e.target.value) }
                    required
                /> 
            </div>
            <div className="field">
                <button className="button is-primary">Update</button> &nbsp;
                <Link to="/" className="button is-info">Kembali</Link>
            </div>
        </form>
    </div>
  )
}

export default EditProduct