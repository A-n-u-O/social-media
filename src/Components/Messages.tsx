import { Divider, Grid } from "@mantine/core";

const Messages = () => {
  return (
    <Grid>
      <Grid.Col span="auto">Search</Grid.Col>
      <Divider orientation="vertical" size="lg" />
      <Grid.Col span={9}>Chats</Grid.Col>
    </Grid>
  );
};
export default Messages;
