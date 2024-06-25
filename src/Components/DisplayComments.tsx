import { Card, ScrollArea, Divider, Box, Flex, Image } from "@mantine/core";
import { Comment } from "./Comment";
import AddComment from "./AddComment";
import {
  getDecodedJwt,
  getDecodedJwtForComment,
  getDecodedJwtForLikes,
} from "./helper";
import axios from "axios";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import emptyHeartIcon from "../assets/emptyHeart.svg";
import filledHeartIcon from "../assets/filledHeart.svg";
import commentIcon from "../assets/Comment.svg";
import { notifications } from "@mantine/notifications";

type DisplayCommentsProp = {
  index: number;
  likes: any;
  comments: {
    username: string;
    text: string;
    date: string;
  }[][];
  // commentCounts: number[];
  handleComments: (
    comments: {
      username: any;
      text: any;
      date: any;
    }[][]
  ) => void;
  // handleCommentCounts: (commentCounts: number[]) => void;
  postId: string;
};

export const DisplayComments = ({
  index,
  comments,
  likes,
  // commentCounts,
  // handleCommentCounts,
  handleComments,
  postId,
}: DisplayCommentsProp) => {
  // Handling comments
  const [mainComment, setMainComment] = useState<
    {
      username: string;
      text: string;
      date: string;
    }[][]
  >(comments);

  const [commentText, setCommentText] = useState<string>("");
  const [likedPosts, setLikedPosts] = useState<any[]>(likes);
  const [noOfLikes, setNoOfLikes] = useState<number>(0);
  const [opened, { toggle }] = useDisclosure(false);
  const handleEmojiSelect = (emoji: any) => {
    setCommentText((prevMessage) => prevMessage + emoji.native);
  };

  const handleCommentText = (commentText: string) => {
    setCommentText(commentText);
  };

  const user = getDecodedJwt();

  const handleCommentSubmit = async (postId: string, index: number) => {
    if (commentText.trim()) {
      const userId = user ? user._id : "";
      const formData = {
        user: userId,
        text: commentText,
      };

      try {
        const response = await axios.put(
          `https://femmetech-backend.onrender.com/api/add-comment/${postId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${getDecodedJwtForComment()}`,
            },
          }
        );
        setMainComment(response.data?.comments);
        setCommentText("");
      } catch (error) {
        console.error("Error adding comment:", error);
        notifications.show({
          message: "error adding comment",
        });
      }
    }
  };

  const handleLikes = async () => {
    const userId = user ? user._id : "";
    try {
      const response = await axios.put(
        `https://femmetech-backend.onrender.com/api/like-post/${postId}`,
        { userId: userId },
        {
          headers: {
            Authorization: `Bearer ${getDecodedJwtForLikes()}`,
          },
        }
      );
      setLikedPosts(response.data?.postLiked.likes);
      // setNoOfLikes(response.data?.likes.length);
      notifications.show({
        message: "post liked!",
      });
    } catch (error) {
      console.error("Error liking post:", error);
      notifications.show({
        message: "unable to like post",
      });
    }
  };

  const handleCheckLiked = () => {};
  // const toggleComments = () => {
  //   opened={opened}
  //   onclose={close}
  // };

  return (
    <>
      <Card.Section mt="xl">
        <Flex justify="space-between" align="center" pl="sm" pr="sm" h="50px">
          <Flex direction="column" justify="center" align="center">
            <Image
              h="1.5rem"
              w="1.5rem"
              src={
                likedPosts.find((item) => item.user === user?._id)
                  ? filledHeartIcon
                  : emptyHeartIcon
              }
              onClick={handleLikes}
              alt="like icon"
              style={{ cursor: "pointer" }}
            />
            <Box component="span">{likedPosts.length} likes</Box>
          </Flex>
          <Flex direction="column" justify="center" align="center">
            <Image
              h="1.5rem"
              w="1.5rem"
              src={commentIcon}
              onClick={toggle}
              alt="comment icon"
              style={{ cursor: "pointer" }}
            />
            <Box component="span">{mainComment.length} comments</Box>
          </Flex>
        </Flex>
      </Card.Section>
      <Divider />

      <Card.Section pl="sm" pr="sm">
        <ScrollArea h="auto">
          <Divider size="sm" />
          {opened &&
            mainComment &&
            mainComment.map((comment: any, i: number) => (
              <Comment
                key={i}
                username={comment?.user?.firstname || "--"}
                text={comment?.text || "--"}
                date={comment?.createdAt || "--"}
              />
            ))}
          <AddComment
            postId={postId}
            index={index}
            commentText={commentText}
            handleCommentText={handleCommentText}
            handleCommentSubmit={handleCommentSubmit}
            handleEmojiSelect={handleEmojiSelect}
          />
        </ScrollArea>
      </Card.Section>
    </>
  );
};
