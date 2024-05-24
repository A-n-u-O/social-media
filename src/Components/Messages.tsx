import { CloseButton, Divider, Grid, Input, rem } from "@mantine/core";
import searchIcon from "../assets/searchIcon.svg";
import { useState } from "react";

const Messages = () => {
  const [search, setSearch] = useState<
    string | number | readonly string[] | undefined
  >();

  const handleSearch=(e: any)=>{
    setSearch(e.target.value)
  }
  return (
    <Grid>
      <Grid.Col span="auto">
        <Input
          placeholder="Search"
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
      </Grid.Col>
      <Divider orientation="vertical" size="lg" />
      <Grid.Col span={9}>Chats</Grid.Col>
    </Grid>
  );
};
export default Messages;
