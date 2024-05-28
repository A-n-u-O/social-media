import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Image,
  Input,
} from "@mantine/core";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const Messages = () => {
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >();
  const navigate = useNavigate();
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Grid bg="#fff">
      <Grid.Col span="auto" m="10px" bg="#FEC3C2" mah="80%">
        <Input
          placeholder="Search for friends"
          value={search}
          onChange={handleSearch}
          //   rightSectionPointerEvents=""
          rightSection={<CloseButton />}
          leftSectionPointerEvents="none"
          leftSection={
            <Image src={searchIcon} alt="search" w="1rem" h="1rem" />
          }
        />
        <Box h="80%" mt="20px" p="10px">
          Your Friends will appear hear
        </Box>
      </Grid.Col>
      <Divider orientation="vertical" size="xs" h={100} c="dark" />
      <Grid.Col span={9}>
        <Flex justify="center" align="center">
          <Button size="xl" onClick={() => navigate("chatBox")}>
            start chatting with friends!
          </Button>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};
export default Messages;
