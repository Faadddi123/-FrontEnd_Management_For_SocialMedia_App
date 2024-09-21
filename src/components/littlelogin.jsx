import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import Cookies from 'js-cookie';

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost/api/login', { email: email, password: password });
            console.log('Login successful:', response.data);
            Cookies.set('token', response.data.token, { expires: 7 });
            Cookies.set('userId', response.data.user.id, { expires: 7 });
            console.log(response.data.token);
            
            window.location.reload(); 
        } catch (error) {
            console.error('Login failed:', error);
             
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;