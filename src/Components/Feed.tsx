import {
  Box,
  Button,
  CloseButton,
  FileButton,
  Flex,
  Image,
  Menu,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
import emojiIcon from "../assets/emojiButtonIcon.svg";
import addPostIcon from "../assets/addIcon.svg";
import { useDisclosure } from "@mantine/hooks";
import { DisplayPosts } from "./DisplayPosts";
import Emojis from "./Emojis";
import { getDecodedJwt, getDecodedJwtForPost } from "./helper";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

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
    Array<{ _id: string; image: string; description: string; comments: string }>
  >([]);
  const handlePosts = (
    posts: {
      _id: string;
      image: string;
      description: string;
      comments: string;
    }[]
  ) => {
    setPosts(posts);
  };

  // const [commentCounts, setCommentCounts] = useState<number[]>([]);
  // const handleCommentCounts = (commentCounts: number[]) => {
  //   setCommentCounts(commentCounts);
  // };

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
        { _id: uuidv4(), image: fileURL || "", description: postDescription, comments: '' },
      ]);
      setLikedPosts([...likedPosts, false]);
      setComments([...comments, []]);
      // setCommentCounts([...commentCounts, 0]);
      setCommentsVisible([...commentsVisible, false]);
      setFile(null);
      setFileURL(null);
      setPostDescription("");
      close();
      resetRef.current?.();
    }
  };

  // For adding emojis to post upload
  const [showEmojis, setShowEmojis] = useState<boolean>(false);
  const handleEmojiSelect = (emoji: any) => {
    setPostDescription((prevMessage) => prevMessage + emoji.native);
  };
  const handleShowEmojis = () => {
    setShowEmojis(!showEmojis);
  };

  const user = getDecodedJwt();

  const handleAddPost = async () => {
    const formData = new FormData();
    const userDescription = postDescription;
    const userId = user ? user._id : "";
    const userImage = file;
    const userDetails = { userId, userDescription, userImage };

    formData.append("user", userDetails.userId);

    if (userDetails.userDescription.trim() !== "") {
      formData.append("text", userDetails.userDescription);
    }
    if (userDetails.userImage) {
      formData.append("files", userDetails.userImage);
    }

    try {
      const response = await axios.post(
        "https://femmetech-backend.onrender.com/api/create-post",
        formData,
        {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${getDecodedJwtForPost()}`,
          },
        }
      );
      const userCode = getDecodedJwtForPost();

      if (!userCode) {
        return <Navigate to="/dashboard" />;
      }
      console.log(response.data);
      addPost();
    } catch (error) {}
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
            style={{ flexGrow: 1 }}
            value={postDescription}
            onChange={handlePostDescription}
          />
          <Button
            onClick={handleAddPost}
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
          // commentCounts={commentCounts}
          // handleCommentCounts={handleCommentCounts}
        />
        {openedImage && (
          <Box
            w="100%"
            h="100dvh"
            pos="fixed"
            left="0"
            onClick={() => {
              closeImage();
            }}
            bg="rgba(0, 0, 0, 0.75)"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <CloseButton
              onClick={closeImage}
              style={{
                position: "fixed",
                top: "10px",
                right: "10px",
                color: "white",
                cursor: "pointer",
              }}
            />
            <Image
              src={selectedImage}
              alt="Full-size image"
              style={{
                maxWidth: "90%",
                maxHeight: "90%",
                objectFit: "contain",
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Feed;
