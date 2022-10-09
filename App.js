import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";

export default function App() {
  const [messages, setMessages] = useState([]);

  const BOT = {
    _id: 2,
    name: "Mr Bot",
    avatar:
      "https://img.favpng.com/11/14/1/computer-icons-clip-art-online-chat-internet-bot-scalable-vector-graphics-png-favpng-RY2PzfedpgxxdpgVr4VUnfq8V.jpg",
  };

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hi there! How can I help you?",
        createdAt: new Date(),
        user: BOT,
      },
    ]);
  }, []);

  const sendBotResponse = (text) => {
    let msg = {
      _id: messages.length + 1,
      text,
      createdAt: new Date(),
      user: BOT,
    };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const onSend = (messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );

    let message = messages[0].text;
    axios
      .get(`https://secret-waters-04346.herokuapp.com?msg=${message}`)
      .then((result) => {
        sendBotResponse(result?.data?.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 1,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
