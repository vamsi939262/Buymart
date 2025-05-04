import React, { useState } from 'react';
import { registerUser } from './UserService';  // Importing the user service
import styles from './Signup.module.css';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const signUpRequest = { name, email, password };
    try {
      setIsSubmitting(true);
      setError('');  // Reset any previous error
      const newUser = await registerUser(signUpRequest);  // Call API to register the user
      console.log('User registered successfully:', newUser);
      // Optionally, redirect to the login page after successful registration
      window.location.href = '/login'; 
    } catch (err) {
      console.error('Registration failed:', err);
      setError('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="animatedBackground">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <div className="container">
      </div>

      {/* Signup box */}
      <div className={styles.container}>
        <div className={styles.signupBox}>
          <h2 className={styles.title}>Create Account</h2>

          <form onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label className={styles.label}>FULL NAME</label>
              <input 
                type="text" 
                className={styles.input} 
                placeholder="Full Name" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>EMAIL</label>
              <input 
                type="email" 
                className={styles.input} 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
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
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>CONFIRM PASSWORD</label>
              <input 
                type="password" 
                className={styles.input} 
                placeholder="Confirm Password" 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
            </div>

            {error && <div className={styles.error}>{error}</div>}

            <div className={styles.buttonContainer}>
              <button 
                type="submit" 
                className={styles.submitButton} 
                disabled={isSubmitting}>
                {isSubmitting ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>

          <div className={styles.orDivider}></div>

          <div className={styles.googleContainer}>
            <button className={styles.authButton}>
              <svg className={styles.googleIcon} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>

          <div className={styles.loginPrompt}>
            Already have an account? 
            <a href="/login" className={styles.loginLink}>Sign in</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
