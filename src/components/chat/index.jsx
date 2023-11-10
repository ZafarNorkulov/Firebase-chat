import React, { useContext, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { MainContext } from "../..";
import { Button, Container, Grid, TextField } from "@mui/material";
import Loader from "../loader";
import firebase from "firebase/compat/app";

const Chat = () => {
  const { auth, firestore } = useContext(MainContext);
  const [user] = useAuthState(auth);
  const [value, setValue] = useState("");
  const [messages, loading] = useCollectionData(
    firestore.collection("messages").orderBy("createdAt")
    );

  const handleSendMessage = async () => {
    firestore.collection("messages").add({
      uid: user.uid,
      displayName: user.displayName,
      photoURL: user.photoURL,
      text: value,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    });
    setValue("");
  };
  if (loading) return <Loader />;
  return (
    <Container>
      <Grid
        container
        style={{ height: window.innerHeight - 50, marginTop: 5 }}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <div style={{ width: "80%", height: "60vh", border: "1px solid gray", overflowX: "auto" }}></div>
        <Grid container direction={"column"} alignItems={"flex-end"} style={{ width: "80%" }}>
          <TextField
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rowMax={2}
            fullWidth
            variant="outlined"
            placeholder="Enter the send message"
          />
          <Button
            onClick={handleSendMessage}
            variant="outlined"
            style={{ background: "green", color: "#fff", marginTop: "5px" }}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Chat;
