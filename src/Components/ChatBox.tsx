import { Box, Button, Image, TextInput } from "@mantine/core";
import emojiIcon from "../assets/emojiButtonIcon.svg";
import { useState } from "react";

const ChatBox = () => {
  const [myMessage, setMyMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };
  const handleMyMessage = (myMessage: string) => {
    setMyMessage(myMessage);
  };
  return (
    <Box w="70%" pos="fixed">
      <TextInput
        w="auto"
        placeholder="Send a message"
        leftSection={
          <Image
            src={emojiIcon}
            w="1.5rem"
            h="1.5rem"
            onClick={() => handleShowEmojis}
          />
        }
        rightSection={
          <Button bg="#fde1e1e7" w="100px">
            Send
          </Button>
        }
        value={myMessage}
        onChange={() => handleMyMessage(myMessage)}
      />
    </Box>
  );
};
export default ChatBox;
