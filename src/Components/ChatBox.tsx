import { Box, Button, Image, TextInput } from "@mantine/core";
import emojiIcon from "../assets/emojiButtonIcon.svg";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { useState } from "react";

const ChatBox = () => {
  const [myMessage, setMyMessage] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);

  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const handleMyMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMyMessage(event.target.value);
  };

  const handleEmojiSelect = (emoji: any) => {
    setMyMessage((prevMessage) => prevMessage + emoji.native);
  };

  return (
    <Box w="70%" pos="fixed">
      <Box pos="absolute" top="-420px" left="0">
        {showEmojis && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
      </Box>
      <TextInput
        w="auto"
        placeholder="Send a message"
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
        rightSection={
          <Button bg="#fde1e1e7" w="100px">
            Send
          </Button>
        }
        value={myMessage}
        onChange={handleMyMessage}
      />
    </Box>
  );
};

export default ChatBox;
