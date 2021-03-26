import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "../components/ChatInput";
import ChatMessage from "../components/ChatMessage";
import db from "../firebase";
import { useParams } from "react-router-dom";

function Chat() {
  let { channelId } = useParams();
  const [channel, setChannel] = useState();
  const [message, setMessage] = useState();

  const getMessage = () => {
    db.collection("rooms")
      .doc(channelId)
      .collection("message")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) => {
        let message = snapshot.docs.map((doc) => doc.data());
        setMessage(message);
      });
  };

  const getChannel = () => {
    db.collection("rooms")
      .doc(channelId)
      .onSnapshot((snapshot) => {
        setChannel(snapshot.data());
      });
  };

  useEffect(() => {
    getChannel();
    setMessage();
  }, [channelId]);
  return (
    <Container>
      <Header>
        <Channel>
          <ChannelName>#{channel && channel.name}</ChannelName>
          <ChannelInfo>Software development company</ChannelInfo>
        </Channel>
        <ChannelDetails>
          <div>Details</div>
          <Info />
        </ChannelDetails>
      </Header>
      <MessageContainer>
        {message.length > 0 &&
          message.map((data, index) => (
            <ChatMessage
              text={data.text}
              name={data.user}
              image={data.userImage}
              timestamp={data.timestamp}
            />
          ))}
      </MessageContainer>
      <ChatInput />
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: grid;
  grid-template-rows: 64px auto min-content;
`;
const Channel = styled.div``;
const ChannelDetails = styled.div`
  display: flex;
  align-items: center;
`;
const ChannelName = styled.div`
  font-width: 700;
  color: #606060;
  font-size: 13px;
  margin-top: 8px;
`;
const ChannelInfo = styled.div`
  font-width: 400;
`;
const Info = styled(InfoOutlinedIcon)`
  margin-left: 20px;
`;
const Header = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(83, 39, 83, 13);
  justify-content: space-between;
`;
const MessageContainer = styled.div``;
