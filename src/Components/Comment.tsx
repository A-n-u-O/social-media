import { Box, Group, Avatar, Text } from "@mantine/core";

type CommentProps = {
  username: any;
  text: any;
  date: any;
};

export const Comment = ({
  username,
  text,
  date,
}: CommentProps) => (
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
