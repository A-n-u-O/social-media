import { Box, Image, TextInput } from "@mantine/core";
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
    <Box>
      <TextInput
        w="80%"
        pos="fixed"
        placeholder="Send a message"
        leftSection={<Image src={emojiIcon} w="1.5rem" h="1.5rem" onClick={() => handleShowEmojis} />}
        value={myMessage}
        onChange={() => handleMyMessage(myMessage)}
      />
    </Box>
  );
};
export default ChatBox;
