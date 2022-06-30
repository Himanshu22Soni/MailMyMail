import React, { useState } from "react";
import "./css/Login.css";
import { auth, provider} from "../firebase";

function Login() {
  const [register, setRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleRegister = (e) => {
    e.preventDefault();
    if (email && password) {
      auth.createUserWithEmailAndPassword(email, password).then((auth) => {
          alert("Registered successfully");
        }).catch((e) => alert(e.message));
    }
    else{
        alert("Please fill all the fields");
    }
  };
  const handleSignIn = () => {
    auth.signInWithPopup(provider).then((auth) => {
      alert("Logged in successfully");
    }).catch((e) => alert(e.message));
  }
  const handleLogIn = (e) => {
    e.preventDefault();
    if (email && password) {
      auth.signInWithEmailAndPassword(email, password).then((auth) => {
        alert("Logged in successfully");
      }).catch((e) => alert(e.message));
    }
  };
  return (
    <div className="login">
      {register ? (
        <>
          <div className="loginContainer">
            <div className="logo">
              <img
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
                alt="logo"
              />
              <h4>Register </h4>
              <p>Create Account to continue with Mail My Mail</p>
            </div>

            <div className="loginContent">
              <input
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <input
                value={password}
                required={true}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <button type="submit" onClick={handleRegister}>
                Register
              </button>
              <button onClick={handleSignIn}>Continue using Google</button>
            </div>
            <p onClick={() => setRegister(false)}>Login</p>
          </div>
        </>
      ) : (
        <>
          <div className="loginContainer">
            <div className="logo">
              <img
                src="https://ssl.gstatic.com/ui/v1/icons/mail/rfr/logo_gmail_lockup_dark_1x_r2.png"
                alt="logo"
              />
              <h4>Sign in </h4>
              <p>to continue to Mail My Mail</p>
            </div>
            <div className="loginContent">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                placeholder="Email"
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
              />
              <button type="submit" onClick={handleLogIn}>
                Login
              </button>
              <button onClick={handleSignIn}>Continue using Google</button>
            </div>
            <p onClick={() => setRegister(true)}>Register</p>
          </div>
        </>
      )}
    </div>
  );
}

export default Login;
