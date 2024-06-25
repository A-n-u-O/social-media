import { Flex, Image, Menu, TextInput } from "@mantine/core";
import sendIcon from "../assets/sendIcon.svg";
import emojiIcon from "../assets/emojiButtonIcon.svg";
import { useState } from "react";
import Emojis from "./Emojis";

type AddCommentProps = {
  postId: string;
  index: number;
  commentText: string;
  handleCommentText: (commentText: string) => void;
  handleCommentSubmit: (postId: string, index: number) => Promise<void>;
  handleEmojiSelect: (emoji: any) => void;
};

const AddComment = ({
  postId,
  index,
  commentText,
  handleCommentText,
  handleCommentSubmit,
  handleEmojiSelect,
}: AddCommentProps) => {
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  return (
    <>
      <Flex justify="center" align="center">
        <TextInput
          p="5px"
          size="md"
          placeholder="Add Comment"
          value={commentText}
          onChange={(e) => handleCommentText(e.target.value)}
          leftSection={
            <Menu shadow="md" width="auto">
              <Menu.Target>
                <Image
                  src={emojiIcon}
                  w="1.5rem"
                  h="1.5rem"
                  mr="md"
                  ml="md"
                  onClick={handleShowEmojis}
                  style={{ cursor: "pointer" }}
                />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Emojis
                    handleEmojiSelect={handleEmojiSelect}
                    showEmojis={showEmojis}
                  />
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          }
          w="100%"
        />
        <Image
          width="1.5rem"
          h="1.5rem"
          src={sendIcon}
          onClick={() => handleCommentSubmit(postId, index)}
          style={{ cursor: "pointer" }}
        />
      </Flex>
    </>
  );
};

export default AddComment;
