import { Box, Button } from "@mantine/core";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { RichTextEditor } from "@mantine/tiptap";
import { useEditor } from "@tiptap/react";

const Feed = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "What's on your mind ?" }),
    ],
    content: "",
  });
  return (
    <Box bg="C3E9E9">
      <Box>
        {" "}
        <RichTextEditor editor={editor}>
          <RichTextEditor.Content />
          <Button>Post</Button>
        </RichTextEditor>
      </Box>
      <Box>post</Box>
      <Box>replies</Box>
    </Box>
  );
};
export default Feed;
