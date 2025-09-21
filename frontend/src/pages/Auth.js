import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = ({ onLogin }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [signupForm, setSignupForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    setError('');
    setTabIndex(newValue);
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupForm({ ...signupForm, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', loginForm);
      const { token, username } = res.data;
      localStorage.setItem('authToken', token);
      localStorage.setItem('username', username);
      onLogin(username); // <- Update user state in App.js
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/api/auth/signup', signupForm);
      setTabIndex(0); // Switch to login tab after signup success
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Paper
      elevation={7}
      sx={{
        maxWidth: 420,
        mx: 'auto',
        mt: 8,
        p: 4,
        borderRadius: 4,
        boxShadow: '0 8px 24px rgba(0,0,0,0.14)',
      }}
    >
      <Typography variant="h4" align="center" fontWeight="700" mb={2}>
        Welcome
      </Typography>
      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        centered
        sx={{
          mb: 3,
          '& .MuiTabs-indicator': {
            height: 4,
            borderRadius: 3,
            backgroundColor: 'primary.main',
          },
        }}
      >
        <Tab label="Login" sx={{ fontWeight: '600', fontSize: '1.1rem' }} />
        <Tab label="Sign Up" sx={{ fontWeight: '600', fontSize: '1.1rem' }} />
      </Tabs>
      {error && (
        <Typography color="error" sx={{ mt: 1, mb: 3, textAlign: 'center', fontWeight: 'medium' }}>
          {error}
        </Typography>
      )}
      {tabIndex === 0 && (
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            value={loginForm.email}
            onChange={handleLoginChange}
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            value={loginForm.password}
            onChange={handleLoginChange}
          />
          <Button type="submit" variant="contained" size="large">
            Login
          </Button>
        </Box>
      )}
      {tabIndex === 1 && (
        <Box
          component="form"
          onSubmit={handleSignupSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
        >
          <TextField
            label="Username"
            name="username"
            required
            value={signupForm.username}
            onChange={handleSignupChange}
            autoFocus
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            required
            value={signupForm.email}
            onChange={handleSignupChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            required
            value={signupForm.password}
            onChange={handleSignupChange}
          />
          <Button type="submit" variant="contained" size="large">
            Sign Up
          </Button>
        </Box>
      )}
    </Paper>
  );
};

export default Auth;
