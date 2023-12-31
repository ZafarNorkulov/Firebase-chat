import React, { useContext, useRef, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MainContext } from "../..";
import { Avatar, Button, Grid } from "@mui/material";
import Loader from "../loader";
import firebase from "firebase/compat/app";
import { serverTimestamp } from "firebase/firestore";

const Chat = () => {
  const { auth, firestore } = useContext(MainContext);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(firestore.collection("messages").orderBy("createdAt"));

  const handleSendMessage = async (e) => {
    e.preventDefault();
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };
  const messageRef = useRef();
  if (loading) return <Loader />;
  return (
    <Grid
      container
      style={{ height: window.innerHeight - 50, marginTop: 5 }}
      alignItems={"center"}
      justifyContent={"center"}
    >
      <div className="chat-container">
        <div style={{ height: window.innerHeight - 100 }} ref={messageRef}>
          {messages.map((item, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "end",
                justifyContent: "end",
                columnGap: 5,
                marginLeft: user.uid === item.uid ? "auto" : 10,
              }}
            >
              <Avatar src={item.photoURL} />
              <div
                style={{
                  margin: 10,
                  marginTop: 20,
                  background: user.uid === item.uid ? "rgba(255,255,255,0.8)" : "rgba(228,83,167,0.6)",
                  width: "40%",
                  padding: 10,
                  borderRadius: 10,
                  position: "relative",
                }}
              >
                <h6>{item.displayName}</h6>
                <p style={{ marginTop: "10px" }}>{item.text}</p>
                <span style={{ position: "absolute", right: 10, bottom: 8, fontSize: "10px" }}>
                  {(() => {
                    const createdAt = item?.createdAt
                    if (createdAt) {
                      const date = new Date((Number(createdAt.seconds) + Number(createdAt.nanoseconds) / 1000000000) * 1000);
                      const hours = date.getHours();
                      const minutes = date.getMinutes();
                
                      return (`${hours}:${minutes}`);
                    }
                    return null
                  })()}
                </span>
              </div>
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSendMessage}
          style={{
            display: "flex",
            width: "100%",
            position: "fixed",
            bottom: 0,
            flexDirection: "row",
            background: "#ccc",
            p: 5,
          }}
        >
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{
              width: "90%",
              height: 50,
              margin: "0 10px",
              border: "none",
              outline: 0,
              padding: 10,
              background: "#ccc",
            }}
            placeholder="Enter the send message"
          />
          <Button>
            <svg
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 512 512"
              height="1.8em"
              width="1.8em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M435.9 64.9l-367.1 160c-6.5 3.1-6.3 12.4.3 15.3l99.3 56.1c5.9 3.3 13.2 2.6 18.3-1.8l195.8-168.8c1.3-1.1 4.4-3.2 5.6-2 1.3 1.3-.7 4.3-1.8 5.6L216.9 320.1c-4.7 5.3-5.4 13.1-1.6 19.1l64.9 104.1c3.2 6.3 12.3 6.2 15.2-.2L447.2 76c3.3-7.2-4.2-14.5-11.3-11.1z"></path>
            </svg>
          </Button>
        </form>
      </div>
    </Grid>
  );
};

export default Chat;
