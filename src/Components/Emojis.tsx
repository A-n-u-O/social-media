import { Box } from "@mantine/core";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

type EmojisProps = {
  handleEmojiSelect: (emoji: any) => void;
  showEmojis: boolean;
};
const Emojis = ({handleEmojiSelect, showEmojis}: EmojisProps) => {
  return (
    <Box pos="absolute" top="-420px" left="0">
      {showEmojis && <Picker data={data} onEmojiSelect={handleEmojiSelect} />}
    </Box>
  );
};
export default Emojis;
