import { Button } from "@mui/material";
import React, { useState, useHistory } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "./firebase";
import { auth } from "./firebase";
import "./Login.css";
import { actions } from "./Reducer";
import { useStateValue } from "./StateProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [{ user }, dispatch] = useStateValue();

  const handleSubmit = async (email, password) => {
    try {
      //auth means auth for this app,
      await signInWithEmailAndPassword(auth, email, password);  
      dispatch({ type: actions.AddUser, user: email });
      await navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message);
      setPassword("");
    }
  };

  const createAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        console.log(auth);
        if (auth){
          dispatch({ type: actions.AddUser, user: email });
           navigate("/");
        }
      })
      .catch((err) => {
        console.error(err);
        alert(err.message);
        if (err.message == "auth/email-already-in-use") setEmail("");
        setPassword("");
      });
  };

  return (
    <div className="login">
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png" />
      <div className="login__box">
        <h1 className="login__Signin">Sign in</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <h4>Email</h4>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <h4>Password</h4>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="signin__button"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit(email, password);
            }}
          >
            Sign In
          </button>
        </form>
        <p className="login__para">
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          className="createAccount__button"
          onClick={(e) => {
            e.preventDefault();
            createAccount();
          }}
        >
          Create Your Amazon account
        </button>
      </div>
    </div>
  );
}

export default Login;
