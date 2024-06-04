import {
  Box,
  CloseButton,
  Flex,
  Grid,
  Image,
  Input,
  ScrollArea,
} from "@mantine/core";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";
import Friends from "./Friends";
import ChatBox from "./ChatBox";

const Messages = () => {
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >();
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
  };
  return (
    <Grid pos="fixed">
      <Grid.Col span={"auto"} m="10px" mah="100%" pos="sticky" bg="#fcf3f3">
        <Input
          placeholder="Search for friends"
          value={search}
          onChange={handleSearch}
          //rightSectionPointerEvents=""
          rightSection={<CloseButton />}
          leftSectionPointerEvents="none"
          leftSection={
            <Image src={searchIcon} alt="search" w="1rem" h="1rem" />
          }
        />
        <Box h="100%" mt="20px" p="10px">
          <ScrollArea h="80%">
            <Friends />
          </ScrollArea>
        </Box>
      </Grid.Col>
      <Grid.Col span={9}>
        <Flex justify="center" pos="fixed" bottom="10%" right="62%">
          <Box m="5%">
            <ChatBox />
            {/* start chatting with friends! */}
          </Box>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};
export default Messages;
