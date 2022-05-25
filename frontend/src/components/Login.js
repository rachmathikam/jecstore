import { useState } from 'react';
import api from '../api';
import Swal from 'sweetalert2'
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const login = async (e) => {
    e.preventDefault();
    try {
      await api.post('/login', {
        email: email,
        password: password
      });
      Swal.fire({
        title: 'Login Berhasil',
        icon: 'success',
        confirmButtonColor: '#3085d6',
      }).then((result) => {
        if (result.isConfirmed) {
          history.push('/')
        }
      })
    }
    catch (err) {
      if (err.response) {
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
      <form className="box mt-6" onSubmit={login}>
        <h1 className="title has-text-centered"><b>Login</b></h1>
        <div className="field mt-5">
          <label className="label">Email</label>
          <div className="control">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              type="email"
              placeholder="input your email!" />
          </div>
        </div>

        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              type="password"
              placeholder="********" />
          </div>
        </div>
        <button className="button is-primary">Login</button>&nbsp;
        <Link to="/register" className="button is-info">Register</Link>
      </form>
    </div>
  )
}

export default Login