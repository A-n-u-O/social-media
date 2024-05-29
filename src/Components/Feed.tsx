import {
  Avatar,
  Box,
  Button,
  Card,
  Divider,
  FileButton,
  Flex,
  Group,
  Image,
  Modal,
  Text,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import emptyHeartIcon from "../assets/emptyHeart.svg";
import filledHeartIcon from "../assets/filledHeart.svg";
import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
import commentIcon from "../assets/Comment.svg";
import { useDisclosure } from "@mantine/hooks";

// type CommentProps = {
//   comment: string;
//   date: string;
// };
const date = new Date();
date.getDate();
date.getHours();
date.getMinutes();
date.getFullYear();
const Feed = () => {
  const [likedPosts, setLikedPosts] = useState<boolean[]>([]);
  // const [comments, setComments] = useState<CommentProps[]>([]);
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

  const handleComment = () => {
    return (
      <Textarea
        size="md"
        label="Add Comment"
        placeholder="Add Comment"
        autosize
      />
    );
  };

  const DisplayPosts = () => {
    return posts.map((post, index) => (
      <>
        <Card key={index} maw="700px" m="auto">
          <Card.Section h="60px" p="sm">
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
              />
            </Card.Section>
          )}
        </Card>
        <Card withBorder maw="700px" m="auto" mb="lg">
          <Card.Section h="80px">
            <Box p="sm">{post.description}</Box>
          </Card.Section>
          <Card.Section>
            <Flex
              justify="space-between"
              align="center"
              pl="sm"
              pr="sm"
              h="50px">
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
                onClick={() => handleComment}
                alt="comment icon"
                style={{ cursor: "pointer" }}
              />
            </Flex>
          </Card.Section>
          <Card.Section pl="sm" pr="sm">
            <Text>Comments</Text>
            <Divider size="sm" />
            <Box mb="xs">
              <Group>
                <Avatar radius="xl" size="sm" />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={700} c="dark">
                    Adewole
                  </Text>
                </div>
              </Group>
              <Text ml="lg">Beautiful</Text>
            </Box>
            <Divider size="xs" w="80%" />
            <Box mb="xs">
              <Group>
                <Avatar radius="xl" size="sm" />

                <div style={{ flex: 1 }}>
                  <Text size="md" fw={700} c="dark">
                    Bayo
                  </Text>
                </div>
              </Group>
              <Text ml="lg">Absolutely stunning</Text>
            </Box>
          </Card.Section>
        </Card>
      </>
    ));
  };

  return (
    <Box bg="#C3E9E9" p="md" w="100%">
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
