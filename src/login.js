 // LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import 'bootstrap/dist/css/bootstrap.min.css';
import SCINLABSLOGO from './SCINLABSLOGO.jpg';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './signup';
import './login.css';
import './loginpage.js'
import { API_BASE_URL } from './configure.js';

function LoginForm({ onLoginSuccess }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loginError, setLoginError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 200) {
        console.log('Login successful');
        onLoginSuccess(formData.email);

        // Encrypt the email before navigating to the dashboard
        const encryptedEmail = CryptoJS.AES.encrypt(formData.email, 'uniqueDashboardKey').toString();
        navigate(`/dashboard/${encodeURIComponent(encryptedEmail)}`);
      } else {
        console.error('Login failed');
        setLoginError(true);
      }
    } catch (error) {
      console.error('Error connecting to the server:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div >
      {/*<img src={SCINLABSLOGO} alt="SCINLABS LOGO" />
      <form className="form-box rounded">
        <h3 className="heading1">Login</h3>
        <input
          placeholder="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="off"
        />
        <input
          placeholder="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="off"
        />
        {loginError && <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>}
        <button className="bone" type="submit" onClick={handleLogin}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p style={{ marginTop: '15px' }}>
          Don't have an account? <span onClick={() => navigate('/signup')}>Signup</span>
        </p>
  </form>*/}

      <div className="a-container">
      <div className="a-left">
        <img src={SCINLABSLOGO} alt="SCINLABS LOGO" />
        

        <div className="a-left-content">
          <h1>Join Us Now.</h1>
          <div className="a-btn" onClick={() => navigate('/signup')}>SIGN UP</div>
        </div>
      </div>
      
      <div className="a-right">
        
        <h1>Admin Login</h1>
        <p className="a-p1">Login to continue</p>
        <form action="#" className="a-form">
          <div className="a-input-box">
            <input type="text" placeholder="Email" className="a-input"  name="email"  value={formData.email} onChange={handleChange} required />
            <label htmlFor="input">Email</label>
          </div>
          <div className="a-input-box">
            <input
              type="password"
              placeholder="Password"
              className="a-input"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="input">Password</label>
          </div>
          {loginError && <p style={{ color: 'red' }}>Login failed. Please check your credentials.</p>}
          <button className="a-btn-sec" onClick={handleLogin}>{loading ? 'Logging in...' : 'Login'}</button>
        </form>
       
      </div>
      <div>
        <button class="member" onClick={() => navigate('/loginpage')}>Member</button>
      </div>
    </div>
    </div>
  );
}

export default LoginForm;
