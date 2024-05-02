import React, { useState, FormEvent } from 'react';
import sqlstring from 'sqlstring';
import DOMPurify from 'dompurify';
import './App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Sanitize user input to prevent XSS
    const sanitizedUsername = DOMPurify.sanitize(username);
    const sanitizedPassword = DOMPurify.sanitize(password);

    // Build secure SQL query using sqlstring
    //const sql: string = sqlstring.format('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

       // Build secure SQL query using sanitized input
       const sql: string = sqlstring.format('SELECT * FROM users WHERE username = ? AND password = ?', [sanitizedUsername, sanitizedPassword]);
    
    try {
      // Here we would send the SQL query to our server to verify user credentials, just log it to the console
      console.log('Secure SQL query:', sql);
    } catch (error) {
      console.error('Error processing query:', error);
    }
  };

  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default App;
