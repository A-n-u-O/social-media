import { Card, ScrollArea, Textarea, Divider, Image, Box } from "@mantine/core";
import sendIcon from "../assets/sendIcon.svg";
import { useState } from "react";
import { Comment } from "./Comment";

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
  const [commentText, setCommentText] = useState<string>("");
  return (
    <>
      <Card.Section pl="sm" pr="sm" style={{ border: "2px solid black" }}>
        <ScrollArea h="250px">
          <CommentNumber commentNo={commentCounts[index]} />
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
        <Textarea
          p="5px"
          size="md"
          label="Add Comment"
          placeholder="Add Comment"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          rightSection={
            <Image
              width="1.5rem"
              h="1.5rem"
              src={sendIcon}
              onClick={() => {
                addComment(index, commentText);
                setCommentText("");
                addCommentNumber(index);
              }}
              w="md"
            />
          }
          autosize
        />
      </Card.Section>
    </>
  );
};
