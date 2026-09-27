import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import {
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

import { auth, db } from "../../firebase";
import { OWNER_UID } from "../../config";

import "./Auth.css";

function Auth({ onClose }) {

  const [mode, setMode] = useState("signin");

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setLoading(true);

    try {

      if (mode === "signup") {

        if (password !== confirmPassword) {
          throw new Error(
            "Passwords do not match."
          );
        }

        const result =
          await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

        const user = result.user;

        // Store profile
        await setDoc(
          doc(db, "users", user.uid),
          {
            uid: user.uid,
            name: name,
            email: user.email,
            createdAt: serverTimestamp(),
          }
        );

        // Create private chat with owner
        await setDoc(
          doc(db, "chats", user.uid),
          {
            ownerUid: OWNER_UID,
            participantUid: user.uid,
            participantEmail: user.email,
            participantName: name,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          },
          {
            merge: true,
          }
        );

      } else {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      }

    } catch (error) {

      console.error(error);

      setError(
        getFirebaseError(error.code)
      );

    } finally {

      setLoading(false);

    }
  };


  const handleGoogleLogin = async () => {

    setError("");

    try {

      const provider =
        new GoogleAuthProvider();

      const result =
        await signInWithPopup(
          auth,
          provider
        );

      const user = result.user;

      await setDoc(
        doc(db, "users", user.uid),
        {
          uid: user.uid,
          name: user.displayName || "",
          email: user.email,
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

      await setDoc(
        doc(db, "chats", user.uid),
        {
          ownerUid: OWNER_UID,
          participantUid: user.uid,
          participantEmail: user.email,
          participantName:
            user.displayName || "",
          updatedAt: serverTimestamp(),
        },
        {
          merge: true,
        }
      );

    } catch (error) {

      console.error(error);

      setError(
        getFirebaseError(error.code)
      );
    }
  };


  return (
    <div className="auth-page">

      <header className="auth-header">

        <button
          className="auth-back"
          onClick={onClose}
        >
          ← Back
        </button>

        <div className="auth-brand">
          <span className="auth-brand-dot"></span>
          PRINCE
        </div>

      </header>


      <main className="auth-main">

        <div className="auth-card">

          <div className="auth-heading">

            <div className="auth-icon">
              {mode === "signin"
                ? "↗"
                : "+"}
            </div>

            <h1>
              {mode === "signin"
                ? "Welcome back"
                : "Create your account"}
            </h1>

            <p>
              {mode === "signin"
                ? "Sign in to continue."
                : "Create your account to start chatting."}
            </p>

          </div>


          <div className="auth-switch">

            <button
              className={
                mode === "signin"
                  ? "switch-btn active"
                  : "switch-btn"
              }
              onClick={() => {
                setMode("signin");
                setError("");
              }}
            >
              Sign In
            </button>

            <button
              className={
                mode === "signup"
                  ? "switch-btn active"
                  : "switch-btn"
              }
              onClick={() => {
                setMode("signup");
                setError("");
              }}
            >
              Sign Up
            </button>

          </div>


          {error && (
            <div className="auth-error">
              {error}
            </div>
          )}


          <form
            className="auth-form"
            onSubmit={handleSubmit}
          >

            {mode === "signup" && (
              <div className="input-group">

                <label>Full Name</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Your name"
                  required
                />

              </div>
            )}


            <div className="input-group">

              <label>Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="you@example.com"
                required
              />

            </div>


            <div className="input-group">

              <label>Password</label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                required
              />

            </div>


            {mode === "signup" && (
              <div className="input-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  placeholder="Confirm password"
                  required
                />

              </div>
            )}


            <button
              className="auth-submit"
              type="submit"
              disabled={loading}
            >

              {loading
                ? "Please wait..."
                : mode === "signin"
                  ? "Sign In"
                  : "Create Account"}

              {!loading && (
                <span>↗</span>
              )}

            </button>

          </form>


          <div className="auth-divider">

            <span></span>

            <p>OR</p>

            <span></span>

          </div>


          <button
            className="google-btn"
            onClick={handleGoogleLogin}
            type="button"
          >

            <span className="google-icon">
              G
            </span>

            Continue with Google

          </button>


          <p className="auth-bottom">

            {mode === "signin"
              ? "Don't have an account?"
              : "Already have an account?"}

            <button
              onClick={() => {
                setMode(
                  mode === "signin"
                    ? "signup"
                    : "signin"
                );

                setError("");
              }}
            >

              {mode === "signin"
                ? "Create one"
                : "Sign in"}

            </button>

          </p>

        </div>

      </main>

    </div>
  );
}


function getFirebaseError(code) {

  switch (code) {

    case "auth/email-already-in-use":
      return "This email is already registered.";

    case "auth/invalid-email":
      return "Please enter a valid email.";

    case "auth/weak-password":
      return "Password should be at least 6 characters.";

    case "auth/invalid-credential":
      return "Invalid email or password.";

    case "auth/popup-closed-by-user":
      return "Google sign-in was cancelled.";

    default:
      return "Something went wrong. Please try again.";
  }
}


export default Auth;