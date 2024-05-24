import {
  Box,
  Button,
  CloseButton,
  Divider,
  Flex,
  Grid,
  Input,
  rem,
} from "@mantine/core";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Messages = () => {
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >();

  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Grid bg="">
      <Grid.Col span="auto" m="10px" bg="#FEC3C2" h="100%">
        <Input
          placeholder="Search for friends"
          value={search}
          onChange={handleSearch}
          //   rightSectionPointerEvents=""
          rightSection={<CloseButton />}
          leftSectionPointerEvents="none"
          leftSection={
            <img
              src={searchIcon}
              alt="search"
              style={{ width: rem(16), height: rem(16) }}
            />
          }
        />
        <Box h="80%" mt="20px" p="10px">
          Your Friends will appear hear
        </Box>
      </Grid.Col>
      <Divider orientation="vertical" size="lg" />
      <Grid.Col span={9}>
        <Flex justify="center" align="center"><Button size="xl" component={Link} to='ChatBox'>start chatting with friends!</Button></Flex>
      </Grid.Col>
    </Grid>
  );
};
export default Messages;
