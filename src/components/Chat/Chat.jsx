import { useEffect, useState } from "react";

import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import {
  signOut,
} from "firebase/auth";

import { auth, db } from "../../firebase";
import { OWNER_UID } from "../../config";

import "./Chat.css";


function Chat({ user }) {

  const [messages, setMessages] =
    useState([]);

  const [message, setMessage] =
    useState("");

  const [sending, setSending] =
    useState(false);


  useEffect(() => {

    if (!user) return;


    const messagesRef =
      collection(
        db,
        "chats",
        user.uid,
        "messages"
      );


    const messagesQuery =
      query(
        messagesRef,
        orderBy("createdAt", "asc")
      );


    const unsubscribe =
      onSnapshot(
        messagesQuery,
        (snapshot) => {

          const data =
            snapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            );

          setMessages(data);

        },
        (error) => {
          console.error(
            "Chat listener error:",
            error
          );
        }
      );


    return () => unsubscribe();

  }, [user]);


  const sendMessage = async (e) => {

    e.preventDefault();

    const text =
      message.trim();

    if (!text || !user || sending)
      return;


    setSending(true);


    try {

      await addDoc(
        collection(
          db,
          "chats",
          user.uid,
          "messages"
        ),
        {
          text: text,

          senderUid:
            user.uid,

          senderEmail:
            user.email,

          createdAt:
            serverTimestamp(),
        }
      );


      setMessage("");

    } catch (error) {

      console.error(
        "Message error:",
        error
      );

    } finally {

      setSending(false);

    }
  };


  const handleLogout = async () => {

    await signOut(auth);

  };


  return (
    <div className="chat-page">

      {/* Header */}

      <header className="chat-header">

        <div className="chat-brand">

          <span className="chat-dot"></span>

          <div>
            <strong>PRINCE</strong>

            <small>
              Personal Chat
            </small>
          </div>

        </div>


        <div className="chat-user">

          <span>
            {user.displayName ||
              user.email}
          </span>

          <button
            onClick={handleLogout}
          >
            Sign Out
          </button>

        </div>

      </header>


      {/* Chat */}

      <main className="chat-main">

        <div className="chat-title">

          <span className="online-dot"></span>

          <div>
            <h1>
              Chat with Prince
            </h1>

            <p>
              Send me a message directly.
            </p>
          </div>

        </div>


        <div className="messages">

          {messages.length === 0 && (
            <div className="empty-chat">

              <div className="empty-icon">
                ✦
              </div>

              <h2>
                Start a conversation
              </h2>

              <p>
                Send your first message.
              </p>

            </div>
          )}


          {messages.map((msg) => {

            const isMine =
              msg.senderUid === user.uid;

            return (
              <div
                key={msg.id}
                className={
                  isMine
                    ? "message-row mine"
                    : "message-row"
                }
              >

                <div className="message-bubble">

                  <p>
                    {msg.text}
                  </p>

                </div>

              </div>
            );

          })}

        </div>


        {/* Input */}

        <form
          className="message-form"
          onSubmit={sendMessage}
        >

          <input
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            placeholder="Write a message..."
          />

          <button
            type="submit"
            disabled={
              sending ||
              !message.trim()
            }
          >
            ↑
          </button>

        </form>

      </main>

    </div>
  );
}


export default Chat;