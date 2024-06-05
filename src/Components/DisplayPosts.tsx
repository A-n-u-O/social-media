import {
  Card,
  Group,
  Avatar,
  Box,
  Flex,
  Divider,
  Image,
  Text,
} from "@mantine/core";
import emptyHeartIcon from "../assets/emptyHeart.svg";
import filledHeartIcon from "../assets/filledHeart.svg";
import commentIcon from "../assets/Comment.svg";
import { DisplayComments } from "./DisplayComments";

type DisplayPostsProps = {
  posts: {
    image: string;
    description: string;
  }[];
  handlePosts: (
    posts: {
      image: string;
      description: string;
    }[]
  ) => void;
  postDescription: string;
  handlePostDescription: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedImage: string | null;
  handleSelectedImage: (selectedImage: string | null) => void;
  likedPosts: boolean[];
  handleLikedPosts: (likedPosts: boolean[]) => void;
  commentsVisible: boolean[];
  handleCommentsVisible: (commentsVisible: boolean[]) => void;
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

export const DisplayPosts = ({
  posts,
  handleSelectedImage,
  likedPosts,
  handleLikedPosts,
  commentsVisible,
  handleCommentsVisible,
  comments,
  handleComments,
  commentCounts,
  handleCommentCounts,
}: DisplayPostsProps) => {
  const toggleLike = (index: number) => {
    handleLikedPosts(
      likedPosts.map((liked, i) => (i === index ? !liked : liked))
    );
  };
  const toggleComments = (index: number) => {
    handleCommentsVisible(
      commentsVisible.map((visible, i) => (i === index ? !visible : visible))
    );
  };
  return posts.map((post, index) => (
    <>
      <Card key={index} maw="600px" m="auto">
        <Card.Section p="xs">
          <Group>
            <Avatar radius="xl" />

            <div style={{ flex: 1 }}>
              <Text size="sm" fw={500} c="dark">
                name
              </Text>
            </div>
          </Group>
        </Card.Section>
        {post.image && (
          <Card.Section h="300px">
            <Image
              src={post.image}
              height="auto"
              w="100%"
              alt="Post image"
              style={{ objectFit: "contain" }}
              onClick={() => handleSelectedImage(post.image)}
            />
          </Card.Section>
        )}
      </Card>
      <Card withBorder maw="600px" m="auto" mb="lg">
        <Card.Section h="30px">
          <Box p="sm">{post.description}</Box>
        </Card.Section>
        <Card.Section>
          <Flex justify="space-between" align="center" pl="sm" pr="sm" h="50px">
            <Image
              h="1.5rem"
              w="1.5rem"
              src={likedPosts[index] ? filledHeartIcon : emptyHeartIcon}
              onClick={() => toggleLike(index)}
              alt="like icon"
              style={{ cursor: "pointer" }}
            />
            <Image
              h="1.5rem"
              w="1.5rem"
              src={commentIcon}
              onClick={() => toggleComments(index)}
              alt="comment icon"
              style={{ cursor: "pointer" }}
            />
          </Flex>
        </Card.Section>
        <Divider />
        {commentsVisible[index] && (
          <DisplayComments
            index={0}
            commentCounts={commentCounts}
            handleCommentCounts={handleCommentCounts}
            comments={comments}
            handleComments={handleComments}
          />
        )}
      </Card>
    </>
  ));
};
