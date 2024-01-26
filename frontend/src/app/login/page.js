"use client";
import "./login.scss";
import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/actions/auth.action";
import { useRouter } from "next/navigation";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef(null);

  const { push } = useRouter();

  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth?.isAuth);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login(username, password));

    form.current.reset();
  };

  useEffect(() => {
    if (isAuth) {
      push("/dashboard");
    }
  }, [isAuth, push]);

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
