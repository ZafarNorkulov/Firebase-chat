import React, { StrictMode, createContext } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/header";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyATj-PE2YX0NIa4EubWxG94mr7KYzCjqtA",
  authDomain: "chat-30229.firebaseapp.com",
  projectId: "chat-30229",
  storageBucket: "chat-30229.appspot.com",
  messagingSenderId: "868953516652",
  appId: "1:868953516652:web:6dc334d5b6407668590649",
  measurementId: "G-DRS3V7H7CK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const MainContext = createContext(null);
const auth = firebase.auth();
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <MainContext.Provider value={{ firestore, auth, firebase }}>
        <Header />
        <App />
      </MainContext.Provider>
    </BrowserRouter>
  </StrictMode>
);
