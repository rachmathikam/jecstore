import {useEffect , useState} from 'react'
import { useHistory, Link } from 'react-router-dom';
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 
import Swal from 'sweetalert2'
import api from '../api';
import jwt_decode from 'jwt-decode'
import axios from 'axios';
const ListProduct = () => {

    const [products,setProduct] = useState([]);
    const [name, setName] = useState([]);
    const [token,setToken] = useState([]);
    const [expired, setExpired] = useState([]);
    const history = useHistory();

    useEffect(() => { 
        refreshToken() 
        getProducts()
    },[])

    const refreshToken = async () => {
        try{
            const response = await api.get('/token');
            setToken(response.data.access_token);
            const decode = jwt_decode(response.data.access_token);
            setName(decode.name);
            setExpired(decode.exp);
            console.log(response.data.access_token);
        }
        catch(err){
            history.push('/login')
        }
       
    }

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config)=>{
        const currentDate = new Date();
        if(expired * 1000 < currentDate.getTime()){
            const result = await api.get('/token');
            config.headers.Authorization = `Bearer ${result.data.access_token}`;
            setToken(result.data.access_token)
            const decode = jwt_decode(result.data.access_token);
            setName(decode.name);
            setExpired(decode.exp);
        }
        return config;
    },(error)=>{
        return Promise.reject(error)
    })
    
    const getProducts = async () => {
        const res = await axiosJWT.get('http://localhost:5000/products',{
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
        setProduct(res.data);
    }
    const deleteProduct = async (id) => {
       await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
             api.delete(`/products/${id}`);
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            }
          })
        
       await getProducts();
    }
    return (
        <div>
            <h1>Selamat Datang <b>{name}</b></h1>
            <Link to="/addProduct" className="button is-primary mt-2">Tambah Product</Link>
            <table id="example" className="table table-striped is-fullwidth">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Nama</th>
                        <th>Harga</th>
                        <th>Dibuat tanggal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    { products.map((product,index) => (
                    <tr key={product.id}>
                        <th>{index+1}</th>
                        <th>{product.nama}</th>
                        <th>{new Intl.NumberFormat().format(product.harga)}</th>
                        <th>{product.createdAt}</th>
                        <th>
                            <Link to={`/editProduct/${product.id}`} className="button is-small is-info">Edit</Link>&nbsp;
                            <button onClick={() => deleteProduct(product.id)} className="button is-small is-danger">Delete</button>
                        </th>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ListProduct