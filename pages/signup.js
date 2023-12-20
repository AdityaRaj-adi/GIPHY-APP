import React, { useState } from 'react';
import { useRouter } from 'next/router'; 

import firebase from '../firebase'; 
import styles from '../styles/signup.module.css';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const router = useRouter(); 

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      
      await firebase.auth().createUserWithEmailAndPassword(email, password);

      
      setSuccessMessage('Signup successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login'); 
      }, 2000); 
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.signupcontainer}>
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        {/* Your form fields for email and password */}
        <label className={styles.signuplabel}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.signuplabel}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Sign Up</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default Signup;