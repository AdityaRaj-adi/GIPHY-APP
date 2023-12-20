import React, { useState } from 'react';
import { useRouter } from 'next/router';
import firebase from '../firebase';
import styles from '../styles/login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const router = useRouter();

  

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);

      
      router.push('/');
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className={styles.logincontainer}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        
        <label className={styles.loginlabel}>
          Email:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label className={styles.loginlabel}>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default Login;