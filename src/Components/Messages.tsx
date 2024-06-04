import {
  Box,
  CloseButton,
  Divider,
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
    <Grid>
      <Grid.Col span={3} m="10px" mah="90%" pos="sticky" bg="#fcf3f3">
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
        <Box h="80%" mt="20px" p="10px">
          <ScrollArea h="100%">
            <Friends />
          </ScrollArea>
        </Box>
      </Grid.Col>
      <Grid.Col span={9}>
        <Flex justify="center" pos="fixed" bottom="10%" right="62%">
          <Box size="xl">
            <ChatBox />
            {/* start chatting with friends! */}
          </Box>
        </Flex>
      </Grid.Col>
    </Grid>
  );
};
export default Messages;
