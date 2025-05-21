import { useState } from 'react';
import API from '../api/api';
import { useNavigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await API.post('/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);

      const role = res.data.role;
      if (role === 'Admin') navigate('/create-software');
      else if (role === 'Employee') navigate('/request-access');
      else if (role === 'Manager') navigate('/pending-requests');
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
