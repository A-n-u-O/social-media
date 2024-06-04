import { Box, Button, Flex, Image, TextInput } from "@mantine/core";
import emojiIcon from "../assets/emojiButtonIcon.svg";

import React, { useState } from "react";
import Emojis from "./Emojis";

const ChatBox = () => {
  const [myMessage, setMyMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [sendText, setSendText] = useState("");

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleMyMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyMessage(event.target.value);
    displayMyMessage();
  };
  const displayMyMessage = () => {};

  const handleEmojiSelect = (emoji: any) => {
    setMyMessage((prevMessage) => prevMessage + emoji.native);
  };

  return (
    <Box w="70%" pos="fixed">
      <Emojis handleEmojiSelect={handleEmojiSelect} showEmojis={showEmojis} />
      <Flex align="center">
        <TextInput
          style={{ flexGrow: 1 }}
          placeholder="Send a message"
          maw="75%"
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
          onClick={() => displayMyMessage}>
          Send
        </Button>
      </Flex>
    </Box>
  );
};

export default ChatBox;
