import {
  Box,
  Button,
  CloseButton,
  FileButton,
  Flex,
  Image,
  Modal,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
import addPostIcon from "../assets/addIcon.svg";
import { useDisclosure } from "@mantine/hooks";
import { DisplayPosts } from "./DisplayPosts";

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<boolean[]>([]);
  const handleLikedPosts = (likedPosts: boolean[]) => {
    setLikedPosts(likedPosts);
  };

  const [comments, setComments] = useState<
    Array<Array<{ username: string; text: string; date: string }>>
  >([]);
  const handleComments = (
    comments: {
      username: string;
      text: string;
      date: string;
    }[][]
  ) => {
    setComments(comments);
  };

  const [commentsVisible, setCommentsVisible] = useState<boolean[]>([]);
  const handleCommentsVisible = (commentsVisible: boolean[]) => {
    setCommentsVisible(commentsVisible);
  };
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<null | string>(null);
  const [posts, setPosts] = useState<
    Array<{ image: string; description: string }>
  >([]);
  const handlePosts = (
    posts: {
      image: string;
      description: string;
    }[]
  ) => {
    setPosts(posts);
  };

  const [commentCounts, setCommentCounts] = useState<number[]>([]);
  const handleCommentCounts = (commentCounts: number[]) => {
    setCommentCounts(commentCounts);
  };
  const resetRef = useRef<() => void>(null);

  useEffect(() => {
    if (file) {
      setFileURL(URL.createObjectURL(file));
    }
  }, [file]);

  const clearFile = () => {
    setFile(null);
    setFileURL(null);
    resetRef.current?.();
  };

  const [opened, { open, close }] = useDisclosure(false);
  const [openedImage, { open: openImage, close: closeImage }] =
    useDisclosure(false);
  const [postDescription, setPostDescription] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const handleSelectedImage = (selectedImage: string | null) => {
    setSelectedImage(selectedImage);
    openImage();
  };

  const handlePostDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostDescription(e.target.value);
  };

  const addPost = () => {
    if (postDescription.trim() || fileURL) {
      setPosts([
        ...posts,
        { image: fileURL || "", description: postDescription },
      ]);
      setLikedPosts([...likedPosts, false]);
      setComments([...comments, []]);
      setCommentCounts([...commentCounts, 0]);
      setCommentsVisible([...commentsVisible, false]);
      setFile(null);
      setFileURL(null);
      setPostDescription("");
      close();
      resetRef.current?.();
    }
  };

  return (
    <Box p="md" w="100%" h="100%" bg="#F9E1E1" color="black">
      <Box mb="md">
        <Modal opened={opened} onClose={close} title="Post Upload">
          <FileButton
            resetRef={resetRef}
            onChange={setFile}
            accept="image/png,image/jpeg">
            {(props) => (
              <Button {...props} m="md">
                Upload
                <Image h="1.5rem" w="1.5rem" m="xs" src={galleryUploadIcon} />
              </Button>
            )}
          </FileButton>

          {fileURL && file && (
            <Box mt={2} ta="center">
              <Box>Post Preview:</Box>
              <Image src={fileURL} h="200px" w="200px" m="auto" />
            </Box>
          )}
          <Button disabled={!file} color="red" onClick={clearFile} m="md">
            Remove
            <Image h="1.5rem" w="1.5rem" m="xs" src={galleryRemoveIcon} />
          </Button>
          <TextInput
            size="md"
            label="Post description"
            placeholder="What's on your mind?"
            value={postDescription}
            onChange={handlePostDescription}
          />
          <Button
            onClick={addPost}
            m="md"
            disabled={!postDescription.trim() && !file}>
            Post
          </Button>
        </Modal>
        <Flex
          direction="row"
          justify="center"
          align="center"
          p="1%"
          maw="24%"
          pos="fixed"
          right="2%"
          bg="grey"
          gap="sm"
          style={{
            borderRadius: "6px",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          }}>
          <Image
            src={addPostIcon}
            h="3.5rem"
            w="3.5rem"
            style={{ cursor: "pointer" }}
            onClick={open}
          />{" "}
          <Text size="25px" c="dark" fs="italic" fw="bold">
            New Post
          </Text>
        </Flex>
      </Box>
      <Box>
        <DisplayPosts
          posts={posts}
          handlePosts={handlePosts}
          postDescription={postDescription}
          handlePostDescription={handlePostDescription}
          selectedImage={selectedImage}
          handleSelectedImage={handleSelectedImage}
          likedPosts={likedPosts}
          handleLikedPosts={handleLikedPosts}
          commentsVisible={commentsVisible}
          handleCommentsVisible={handleCommentsVisible}
          comments={comments}
          handleComments={handleComments}
          commentCounts={commentCounts}
          handleCommentCounts={handleCommentCounts}
        />
        {openedImage && (
          <Box
            w="100%"
            h="100dvh"
            pos="fixed"
            left="0"
            onClick={() => {
              setSelectedImage(null);
              closeImage();
            }}
            top="0"
            bg="#5c5a5a99"
            style={{ zIndex: 500 }}>
            <Flex justify="flex-end">
              <CloseButton
                onClick={() => {
                  setSelectedImage(null);
                  closeImage();
                }}
              />
            </Flex>
            <Flex justify="center">
              {selectedImage && (
                <Image
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                  src={selectedImage}
                  w="auto"
                  h="auto"
                  style={{ objectFit: "contain" }}
                />
              )}
            </Flex>
          </Box>
        )}
        {/* <Modal
          opened={openedImage}
          onClose={() => {
            setSelectedImage(null);
            closeImage();
          }}
          fullScreen={isMobile}
          overlayProps={{ backgroundOpacity: 0.45, blur: 3 }}
          styles={{
            root: {
              width: "100%",
            },
          }}
          // transitionProps={{
          //   transition: "fade",
          //   duration: 600,
          //   timingFunction: "linear",
          // }}
        >
          
        </Modal> */}
      </Box>
    </Box>
  );
};

export default Feed;
