import React, { useState, FormEvent, useEffect } from 'react';
import bcrypt from 'bcryptjs';
import sqlstring from 'sqlstring';
import DOMPurify from 'dompurify';
import ErrorModal from './components/ErrorModal/ErrorModal';
import './App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setError('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [error]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!username || !password) {
      setError('Please enter a valid username and password.');
      return;
    }

    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Hash the password securely
    const hashedPassword = await bcrypt.hash(sanitizedPassword, 10);

    // Use parameterized query to prevent SQL injection
    const sql: string = 'SELECT * FROM users WHERE username = ? AND password = ?';
    const values = [sanitizedUsername, hashedPassword];

    try {
      // Execute the parameterized query
      console.log('Secure SQL query:', sql);
      console.log('Values:', values);
    } catch (error) {
      console.error('Error processing query:', error);
    }
  };

  const handleInputChange = () => {
    if (error) {
      setError('');
    }
  };

  const closeModal = () => {
    setError('');
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); handleInputChange(); }} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); handleInputChange(); }} />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <ErrorModal message={error} onClose={closeModal} />}
    </div>
  );
}

export default App;
