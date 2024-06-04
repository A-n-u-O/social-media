import { Avatar, Box, Button, Flex, Image, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import emojiIcon from "../assets/emojiButtonIcon.svg";
import Emojis from "./Emojis";
import Chats from "./Chats";

const ChatBox = () => {
  const [myMessage, setMyMessage] = useState<string>("");
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<{ text: string; date: string }>>([]);

  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleMyMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyMessage(event.target.value);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMyMessage((prevMessage) => prevMessage + emoji.native);
  };

  const displayMyMessage = () => {
    if (myMessage.trim()) {
      setMessages([...messages, { text: myMessage, date: getFormattedDate() }]);
      setMyMessage(""); // Clear the input after sending the message
    }
  };

  return (
    <Box w="70%" pos="fixed">
      <Flex bg="grey" pos="absolute" top="-580px" w="92%" align="center" p="xs">
        <Avatar size="lg"/>
        <Text size="lg" fw="bold">User</Text>
      </Flex>
      <Chats messages={messages}/>
      <Emojis handleEmojiSelect={handleEmojiSelect} showEmojis={showEmojis} />
      <Flex mb="sm">
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder="Send a message"
          maw="80%"
          leftSection={
            <Image
              src={emojiIcon}
              w="1.5rem"
              h="1.5rem"
              mr="md"
              ml="md"
              onClick={handleShowEmojis}
              style={{ cursor: "pointer" }}
            />
          }
          value={myMessage}
          onChange={handleMyMessage}
        />
        <Button
          bg="#fde1e1e7"
          w="100px"
          ml="xs"
          onClick={displayMyMessage}
        >
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatBox;
