import {
  Box,
  Button,
  CloseButton,
  FileButton,
  Flex,
  Image,
  Modal,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";

import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
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

  const handlePostDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <Box p="md" w="100%" h="auto">
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
          <Textarea
            autosize
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
        pos="fixed"
        right="20px"
        bottom="18px"
          onClick={open}
          justify="right"
          fz="40px"
          fw="600"
          maw="400px"
          style={{
            cursor: "pointer",
            borderRadius: "14px",
            height: "4rem",
            padding: "0 1.6rem",
            textShadow: 'rgba(0, 0, 0, 0.25) 0 3px 8px',
            backgroundImage: 'radial-gradient(93% 87% at 87% 89%,  #fba0a0d7  0%, transparent 86.18%), radial-gradient(66% 66% at 26% 20%, #f3c2c2d7  0%,  43.89%, #d08686d7  69.79%)',
            transition:' all .5s',
  boxShadow: "inset -3px -3px 9px rgba(255, 255, 255, 0.25), inset 0px 3px 9px rgba(255, 255, 255, 0.3), inset 0px 1px 1px rgba(255, 255, 255, 0.6), inset 0px -8px 36px rgba(0, 0, 0, 0.3), inset 0px 1px 5px rgba(255, 255, 255, 0.6), 2px 19px 31px rgba(0, 0, 0, 0.2)",
  border: '0'
          }}>
          New Post
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
