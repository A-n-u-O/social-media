import { Box, Button, FileButton, Group, Image, Modal } from "@mantine/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";
import galleryUploadIcon from "../assets/galleryUpload.svg";
import galleryRemoveIcon from "../assets/galleryRemove.svg";

const Feed = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "What's on your mind ?" }),
    ],
    content: "",
  });
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState<File | null>();
  const [fileURL, setFileURL] = useState<null | string>();
  console.log(fileURL);
  useEffect(() => {
    if (file) {
      setFileURL(URL.createObjectURL(file));
    }
  }, [file]);
  const resetRef = useRef<() => void>(null);

  const clearFile = () => {
    setFile(null);
    resetRef.current?.();
  };

  return (
    <Box bg="C3E9E9">
      <Box>
        {" "}
        <RichTextEditor editor={editor}>
          <RichTextEditor.Content />
          <Button>Post</Button>
        </RichTextEditor>
      </Box>
      <Box>
        <Modal opened={opened} onClose={close} title="Post" centered>
          {/* Modal content */}
          <Group justify="center">
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
          </Group>

          {fileURL && file && (
            <Box mt={2} ta="center">
              <Box>Post Preview:</Box>
              <Image src={fileURL} h="200px" w="200px" />
            </Box>
          )}
          <Button disabled={!file} color="red" onClick={clearFile} m="md">
            Remove
            <Image h="1.5rem" w="1.5rem" m="xs" src={galleryRemoveIcon} />
          </Button>
          <Button>Ok</Button>
        </Modal>

        <Button onClick={open}>Upload Post</Button>
      </Box>
      <Box>replies</Box>
    </Box>
  );
};
export default Feed;
