import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields.');
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.dispatchEvent(new Event('storage')); // ✅ This triggers Navbar update
      
        navigate('/');
      }
      else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Connection error. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <h2 className={styles.welcome}>Welcome back 👋🏻</h2>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>EMAIL</label>
            <input
              type="email"
              className={styles.input}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>PASSWORD</label>
            <input
              type="password"
              className={styles.input}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          <div className={styles.rememberForgot}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className={styles.forgotPassword}>
              Forgot password?
            </Link>
          </div>

          <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Signing In...' : 'SIGN IN'}
          </button>
        </form>

        <div className={styles.orDivider}></div>

        <div className={styles.googleContainer}>
          <button 
            className={styles.authButton}
            onClick={() => alert('Google login coming soon!')}
          >
            <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {/* Google icon paths */}
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>

        <div className={styles.signupPrompt}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.signupLink}>Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;