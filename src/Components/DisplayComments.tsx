import {
  Card,
  ScrollArea,
  Divider,
  Image,
  Box,
  TextInput,
  Flex,
  Menu,
} from "@mantine/core";
import sendIcon from "../assets/sendIcon.svg";
import emojiIcon from "../assets/emojiButtonIcon.svg";

import { useState } from "react";
import { Comment } from "./Comment";
import Emojis from "./Emojis";

type DisplayCommentsProp = {
  index: number;
  comments: {
    username: string;
    text: string;
    date: string;
  }[][];
  handleComments: (
    comments: {
      username: string;
      text: string;
      date: string;
    }[][]
  ) => void;
  commentCounts: number[];
  handleCommentCounts: (commentCounts: number[]) => void;
};

export const DisplayComments = ({
  index,
  comments,
  handleComments,
  commentCounts,
  handleCommentCounts,
}: DisplayCommentsProp) => {
  const getFormattedDate = () => {
    const date = new Date();
    return `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  };

  //Function to update number of comments
  const addCommentNumber = (index: number) => {
    let commentNo = index + 1;
    return commentNo;
  };

  //Component to update number of comments
  const CommentNumber = ({ commentNo }: { commentNo: number }) => (
    <Box component="span">{commentNo} comments</Box>
  );

  //Function to update comments
  const addComment = (index: number, commentText: string) => {
    if (commentText.trim()) {
      const newComment = {
        username: "User",
        text: commentText,
        date: getFormattedDate(),
      };
      handleComments(
        comments.map((postComments, i) =>
          i === index ? [...postComments, newComment] : postComments
        )
      );
      //update comment numbers
      handleCommentCounts(
        commentCounts.map((count, i) => (i === index ? count + 1 : count))
      );
    }
  };
  //emoji for comments
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };
  const handleEmojiSelect = (emoji: any) => {
    setCommentText((prevMessage) => prevMessage + emoji.native);
  };
  const [commentText, setCommentText] = useState<string>("");
  return (
    <>
      <CommentNumber commentNo={commentCounts[index]} />

      <Card.Section pl="sm" pr="sm">
        <ScrollArea h="auto">
          <Divider size="sm" />
          {comments[index].map((comment, i) => (
            <Comment
              key={i}
              username={comment.username}
              text={comment.text}
              date={comment.date}
            />
          ))}
        </ScrollArea>
        <Flex justify="center" align="center">
          <TextInput
            p="5px"
            size="md"
            placeholder="Add Comment"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
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
            onClick={() => {
              addComment(index, commentText);
              setCommentText("");
              addCommentNumber(index);
            }}
          />
        </Flex>
      </Card.Section>
    </>
  );
};
