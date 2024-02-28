import React, { useState } from "react";
import { observer } from "mobx-react";
import store from "../../store";

const Login: React.FC = observer(() => {
  const { isLoggedIn, loginUser } = store;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    loginUser(username, password);
  };
  return (
    <section>
      <h2>Login Form</h2>
      <p>the user is logged in: {String(isLoggedIn)}</p>

      {!isLoggedIn && (
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
      )}
    </section>
  );
});

export default Login;
