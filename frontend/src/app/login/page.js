"use client";
import "./login.scss";
import { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/auth.action";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef(null);

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));

    form.current.reset();
  };

  return (
    <div>
      <form ref={form} onSubmit={handleSubmit} className="form">
        <h1>Login</h1>
        <div className="form__username">
          <label>Username:</label>
          <input
            type="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form__password">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form__submit">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Login;
