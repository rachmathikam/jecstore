import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
const AddProduct = () => {

    const [nama,setNama]    = useState('');
    const [harga,setHarga]  = useState('');
    const history = useHistory();

    const saveProduct = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:5000/products/',{
            nama: nama,
            harga: harga
        });
        Swal.fire({
            title: 'Data created successfully',
            icon: 'success',
            confirmButtonColor: '#3085d6',
          }).then((result) => {
            if (result.isConfirmed) {
                history.push('/')
            }
          })
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
                <button className="button is-primary">Simpan</button> &nbsp;
                <Link to="/" className="button is-info">Kembali</Link>
            </div>
        </form>
    </div>
  )
}

export default AddProduct