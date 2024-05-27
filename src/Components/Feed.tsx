import { Box, Button, FileButton, Group, Modal } from "@mantine/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useRef, useState } from "react";

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
              {(props) => <Button {...props}>Upload image</Button>}
            </FileButton>
            <Button disabled={!file} color="red" onClick={clearFile}>
              Remove
            </Button>
          </Group>

          {fileURL && file && (
            <Box mt={2} ta="center">
              <div>Profile Picture Preview:</div>
              <img src={fileURL} height="100px" />
            </Box>
          )}
        </Modal>
        <Button onClick={open}>Upload Post</Button>
      </Box>
      <Box>replies</Box>
    </Box>
  );
};
export default Feed;
