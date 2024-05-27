import {
  Box,
  Button,
  Card,
  FileButton,
  Flex,
  Image,
  Modal,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import emptyHeartIcon from "../assets/emptyHeart.svg";
import filledHeartIcon from "../assets/filledHeart.svg";
import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
import { useDisclosure } from "@mantine/hooks";

const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<boolean[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<null | string>(null);
  const [posts, setPosts] = useState<
    Array<{ image: string; description: string }>
  >([]);
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
  const [postDescription, setPostDescription] = useState<string>("");

  const handlePostDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPostDescription(e.target.value);
  };

  const addPost = () => {
    if (fileURL) {
      setPosts([...posts, { image: fileURL, description: postDescription }]);
      setLikedPosts([...likedPosts, false]);
      setFile(null);
      setFileURL(null);
      setPostDescription("");
      close();
      resetRef.current?.();
    }
  };

  const toggleLike = (index: number) => {
    setLikedPosts(likedPosts.map((liked, i) => (i === index ? !liked : liked)));
  };

  const DisplayPosts = () => {
    return posts.map((post, index) => (
      <Card key={index} mb="sm" h="400px" maw="600px" m="auto">
        {post.image && (
          <Card.Section h="300">
            <Image src={post.image} height="250px" alt="Post image" />
          </Card.Section>
        )}
        <Card.Section h="100px">
          <Box p="md">{post.description}</Box>
        </Card.Section>
        <Flex justify="space-between" align="center" p="md" h="50px">
          <Image
            h="1.5rem"
            w="1.5rem"
            src={likedPosts[index] ? filledHeartIcon : emptyHeartIcon}
            onClick={() => toggleLike(index)}
            alt="like icon"
            style={{ cursor: "pointer" }}
          />
        </Flex>
      </Card>
    ));
  };

  return (
    <Box bg="#C3E9E9" p="md">
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
            size="md"
            label="Post description"
            placeholder="What's on your mind?"
            value={postDescription}
            onChange={handlePostDescription}
          />
          <Button onClick={addPost} m="md" disabled={!postDescription && !file}>
            Post
          </Button>
        </Modal>
        <Button onClick={open}>Post Something</Button>
      </Box>
      <Box>
        <DisplayPosts />
      </Box>
    </Box>
  );
};

export default Feed;
