import { Card, Group, Avatar, Box, Divider, Image, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import axios from "axios";

import { DisplayComments } from "./DisplayComments";
import { getDecodedJwtForPost } from "./helper";

type DisplayPostsProps = {
  posts: {
    _id: string;
    image: string;
    description: string;
    comments: string;
  }[];
  handlePosts: (
    posts: {
      _id: string;
      image: string;
      description: string;
      comments: string;
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
  // commentCounts: number[];
  // handleCommentCounts: (commentCounts: number[]) => void;
};

export const DisplayPosts = ({
  posts,
  handlePosts,
  handleSelectedImage,
  handleComments,
}: DisplayPostsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const token = getDecodedJwtForPost();
        const response = await axios.get<{
          posts: {
            _id: string;
            image: string;
            description: string;
            comments: string;
          }[];
        }>("https://femmetech-backend.onrender.com/api/posts", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (response.data) {
          handlePosts(response.data?.posts);
          // Initialize comments and commentCounts based on fetched posts
          // handleComments(response.data?.posts?.comments);
          // handleCommentCounts(response.data?.posts?.comments?.length);
        } else {
          handlePosts([]);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <>
      {isLoading ? (
        <Box size="xl" color="white" ta="center">
          Loading...
        </Box>
      ) : (
        posts?.map((post: any, index: number) => (
          <Card key={post?._id} maw="600px" m="auto" mb="5%">
            <Card.Section p="xs">
              <Group pb="2%">
                <Avatar radius="xl" />
                <div style={{ flex: 1 }}>
                  <Text size="sm" fw={500} c="dark">
                    {post?.user?.firstname}
                  </Text>
                </div>
              </Group>
              <Divider />
            </Card.Section>
            {post?.image && (
              <Card.Section h="300px">
                <Image
                  src={post?.image}
                  height="auto"
                  w="100%"
                  alt="Post image"
                  style={{ objectFit: "contain" }}
                  onClick={() => handleSelectedImage(post?.image)}
                />
              </Card.Section>
            )}
            <Card.Section h="30px">
              <Box p="sm">{post?.text}</Box>
            </Card.Section>

            <DisplayComments
              postId={post?._id}
              index={index}
              comments={post?.comments}
              likes={post?.likes}
              handleComments={handleComments}
              // commentCounts={post?.comments?.length}
              // handleCommentCounts={handleCommentCounts}
            />
          </Card>
        ))
      )}
    </>
  );
};
