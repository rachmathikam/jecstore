import { useState } from 'react';
import api from '../api';
import Swal from 'sweetalert2'
import { useHistory, Link } from 'react-router-dom';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setconfPassword] = useState('');
    const [error, setError] = useState('');
    const history = useHistory();

    const registerUser = async (e) => {
        e.preventDefault();
        try{
            const res = await api.post('/users/', {
                name: name,
                email: email,
                password: password,
                confPassword: confPassword
            });
            Swal.fire({
                title: 'Data created successfully',
                icon: 'success',
                confirmButtonColor: '#3085d6',
            }).then((result) => {
                if (result.isConfirmed) {
                    history.push('/login')
                }
            })
        }
        catch(err){
            if(err.response){
                setError(err.response.data.errors);
                console.error(err.response.data.errors)
                Swal.fire({
                    title: err.response.data.errors,
                    icon: 'error'
                })
            }
        }
        
    }
    return (
        <div>
            <form className="box mt-6" onSubmit={registerUser}>
                <h1 className="title has-text-centered"><b>Register</b></h1>
                <div className="field mt-5">
                    <label className="label">Nama</label>
                    <div className="control">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input"
                            type="text"
                            placeholder="jhon Doe" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input"
                            type="email"
                            placeholder="e.g. alex@example.com" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input 
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)}
                            className="input" 
                            type="password" 
                            placeholder="********" />
                    </div>
                </div>

                <div className="field">
                    <label className="label">Confirm Password</label>
                    <div className="control">
                        <input
                            value={confPassword}
                            onChange={ (e) => setconfPassword(e.target.value)}
                            className="input" 
                            type="password" 
                            placeholder="********" />
                    </div>
                </div>

                <button className="button is-primary">Register</button>&nbsp;
                <Link to="/login" className="button is-info">Login</Link>
            </form>
        </div>
    )
}

export default Register