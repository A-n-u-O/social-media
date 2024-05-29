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
  ScrollArea,
  Text,
  Textarea,
} from "@mantine/core";
import { useEffect, useRef, useState } from "react";
import emptyHeartIcon from "../assets/emptyHeart.svg";
import filledHeartIcon from "../assets/filledHeart.svg";
import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";
import commentIcon from "../assets/Comment.svg";
import sendIcon from "../assets/sendIcon.svg";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

// type CommentProps = {
//   comment: string;
//   date: string;
// };

const getFormattedDate = () => {
  const date = new Date();
  return `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
};

const Feed = () => {
  const isMobile = useMediaQuery("(max-width: 50em)");
  const [likedPosts, setLikedPosts] = useState<boolean[]>([]);
  const [comments, setComments] = useState<
    Array<Array<{ username: string; text: string; date: string }>>
  >([]);
  const [commentsVisible, setCommentsVisible] = useState<boolean[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [fileURL, setFileURL] = useState<null | string>(null);
  const [posts, setPosts] = useState<
    Array<{ image: string; description: string }>
  >([]);
  const [commentCounts, setCommentCounts] = useState<number[]>([]);
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
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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

  const toggleLike = (index: number) => {
    setLikedPosts(likedPosts.map((liked, i) => (i === index ? !liked : liked)));
  };
  const toggleComments = (index: number) => {
    setCommentsVisible(
      commentsVisible.map((visible, i) => (i === index ? !visible : visible))
    );
  };
  const addComment = (index: number, commentText: string) => {
    if (commentText.trim()) {
      const newComment = {
        username: "User",
        text: commentText,
        date: getFormattedDate(),
      };
      setComments(
        comments.map((postComments, i) =>
          i === index ? [...postComments, newComment] : postComments
        )
      );
      setCommentCounts(
        commentCounts.map((count, i) => (i === index ? count + 1 : count))
      );
    }
  };
  const addCommentNumber = (index: number) => {
    let commentNo = index + 1;
    return commentNo;
  };
  const CommentNumber = ({ commentNo }: { commentNo: number }) => (
    <Box component="span">{commentNo} comments</Box>
  );

  const Comment = ({
    username,
    text,
    date,
  }: {
    username: string;
    text: string;
    date: string;
  }) => (
    <Box mb="xs" style={{ borderTop: "1px solid black" }}>
      <Group>
        <Avatar radius="xl" size="sm" />
        <div style={{ flex: 1 }}>
          <Text size="md" fw={700} c="dark">
            {"name" && username}
          </Text>
        </div>
      </Group>
      <Text ml="lg">{text}</Text>
      <Box component="span" fz="xs">
        {date}
      </Box>
    </Box>
  );
  const DisplayComments = ({ index }: { index: number }) => {
    const [commentText, setCommentText] = useState<string>("");
    return (
      <>
        <Card.Section pl="sm" pr="sm" style={{ border: "2px solid black" }} >
          <ScrollArea h="250px">
          <Textarea
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
        </Card.Section>
          
      </>
    );
  };

  const handleImageClick = (image: string) => () => {
    setSelectedImage(image);
    open();
  };

  const DisplayPosts = () => {
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
                onClick={handleImageClick(post.image)}
              />
            </Card.Section>
          )}
        </Card>
        <Card withBorder maw="600px" m="auto" mb="lg">
          <Card.Section h="30px">
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
                onClick={() => toggleComments(index)}
                alt="comment icon"
                style={{ cursor: "pointer" }}
              />
            </Flex>
          </Card.Section>
          <Divider/>
          {commentsVisible[index] && <DisplayComments index={0} />}
        </Card>
      </>
    ));
  };

  return (
    <Box p="md" w="100%">
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
        <Button onClick={open}>Post Something</Button>
      </Box>
      <Box>
        <DisplayPosts />
        <Modal
          opened={opened && !!selectedImage}
          onClose={() => setSelectedImage(null)}
          fullScreen={isMobile}
          overlayProps={{ backgroundOpacity: 0.45, blur: 3 }}
          transitionProps={{
            transition: "fade",
            duration: 600,
            timingFunction: "linear",
          }}>
          {selectedImage && (
            <Image
              src={selectedImage}
              w="auto"
              h="auto"
              style={{ objectFit: "contain" }}
            />
          )}
        </Modal>
      </Box>
    </Box>
  );
};

export default Feed;
