import {
  Box,
  Button,
  Card,
  FileButton,
  Flex,
  Image,
  Modal,
  TextInput,
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
  //text post
  const [postDescription, setPostDescription] = useState<string>("");
  const DisplayPostDescription = () => {
    return (
      <Card>
        <Card.Section>{postDescription}</Card.Section>
        <Flex>
          <Image
            h="1.5rem"
            w="1.5rem"
            src={emptyHeartIcon ? filledHeartIcon : emptyHeartIcon}
          />
        </Flex>
      </Card>
    );
  };
  const handlePostDescription = (e: any) => {
    setPostDescription(e.target.value);
    DisplayPostDescription();
  };

  return (
    <Box bg="C3E9E9">
      <Box>
        {" "}
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
            <Box mt={2} ta="center" >
              <Box>Post Preview:</Box>
              <Image src={fileURL} h="200px" w="200px" m="auto"/>
            </Box>
          )}
          <Button disabled={!file} color="red" onClick={clearFile} m="md">
            Remove
            <Image h="1.5rem" w="1.5rem" m="xs" src={galleryRemoveIcon} />
          </Button>
          <Textarea
            size="md"
            description="Post description"
            placeholder="What's on your mind?"
            value={postDescription}
            onClick={handlePostDescription}
          />
        </Modal>
        <Button onClick={open}>Post Something</Button>
      </Box>
      <Box>post</Box>
      <Box>replies</Box>
    </Box>
  );
};
export default Feed;
