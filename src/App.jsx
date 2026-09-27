import { useEffect, useState } from "react";

import {
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "./firebase";

import SphereScene from "./components/SphereScene.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Chat from "./components/Chat/Chat.jsx";

import "./App.css";


function App() {

  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [showAuth, setShowAuth] =
    useState(false);


  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);

          setLoading(false);

        }
      );

    return () => unsubscribe();

  }, []);


  // Loading screen
  if (loading) {

    return (
      <div className="loading-screen">

        <div className="loading-dot"></div>

        <p>
          Loading...
        </p>

      </div>
    );

  }


  // Logged-in user → show Chat
  if (user) {

    return (
      <Chat user={user} />
    );

  }


  // Authentication screen
  if (showAuth) {

    return (
      <Auth
        onClose={() =>
          setShowAuth(false)
        }
      />
    );

  }


  // Main portfolio
  return (
    <main className="app">

      <div className="background" />

      <Navbar
        onAuthClick={() =>
          setShowAuth(true)
        }
      />

      <SphereScene />

    </main>
  );

}
export default App;