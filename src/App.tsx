import React, { useState, FormEvent } from 'react';
import sqlstring from 'sqlstring';
import './App.css';

function App() {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Build secure SQL query using sqlstring
    const sql: string = sqlstring.format('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);

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
