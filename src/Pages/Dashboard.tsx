import {
  Affix,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Group,
  Image,
  Menu,
  MenuItem,
  MenuLabel,
  Text,
  Transition,
  UnstyledButton,
} from "@mantine/core";
import { Outlet, useNavigate } from "react-router";
import arrowUpIcon from "../assets/arrowUpIcon.svg";
import chevronRightIcon from "../assets/chevronRightIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import feedIcon from "../assets/feedIcon.svg";
import logOutIcon from "../assets/logOutIcon.svg";
import { useWindowScroll } from "@mantine/hooks";
import { forwardRef } from "react";
import { getDecodedJwt } from "../Components/helper";
const Dashboard = () => {
  const navigate = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  const user = getDecodedJwt();
  console.log(user);
  interface UserButtonProps extends React.ComponentPropsWithoutRef<"button"> {
    image: string;
    name: string;
    email: string;
    icon?: React.ReactNode;
  }

  const UserButton = forwardRef<HTMLButtonElement, UserButtonProps>(
    ({ image, name, email, icon, ...others }: UserButtonProps, ref) => (
      <UnstyledButton
        ref={ref}
        style={{
          padding: "var(--mantine-spacing-md)",
          color: "var(--mantine-color-text)",
          borderRadius: "var(--mantine-radius-sm)",
        }}
        {...others}>
        <Group>
          <Avatar radius="xl" src={user ? user.profilePicture : ""} />

          <div style={{ flex: 1 }}>
            <Text size="sm" fw={500} c="#F9E2E2">
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || (
            <Image
              src={chevronRightIcon}
              style={{ height: "1rem", width: "1rem" }}
            />
          )}
        </Group>
      </UnstyledButton>
    )
  );
  return (
    <>
      <Box mih="100%" c="#F9E2E2" w="100%" bg="dark">
        <Flex
          pos="fixed"
          top="0"
          w="100%"
          h="80px"
          bg="dark"
          style={{ zIndex: 200 }}
          direction="column"
          justify="space-between">
          <Flex direction="row" justify="space-between" w="100%">
            <Text fz="40px" p="10px">
              Social Hub
            </Text>
            {/* profile */}
            <Menu shadow="lg" width={250} withArrow>
              <Menu.Target>
                <UserButton
                  name={user ? user.firstname + " " + user.lastname : ""}
                  email={user ? user.email : ""}
                  image={user ? user.profilePicture : ""}
                />
              </Menu.Target>
              <Menu.Dropdown bg="#F9E1E1">
                <MenuItem
                  bg="white"
                  m="5%"
                  maw="90%"
                  leftSection={
                    <Image w="1rem" h="1rem" c="blue" src={chevronRightIcon} />
                  }>
                  <MenuLabel>
                    <Flex gap="3%" align="center" justify="center">
                      <Avatar
                        src={user ? user.profilePicture : ""}
                        radius="xl"
                        size="md"
                        mr="3px"
                      />{" "}
                      <Text> View profile</Text>
                    </Flex>
                  </MenuLabel>
                </MenuItem>
                <MenuItem
                   m="5%"
                   maw="90%"
                  bg="white"
                  leftSection={
                    <Image w="1rem" h="1rem" c="blue" src={chevronRightIcon} />
                  }>
                  <MenuLabel onClick={() => navigate("/")}>
                    <Flex gap="5%" align="center" justify="center">
                      <Image src={logOutIcon} h="1.5rem" w="1.5rem" />
                      <Text>Logout</Text>
                    </Flex>
                  </MenuLabel>
                </MenuItem>
              </Menu.Dropdown>
            </Menu>
          </Flex>
          <Divider w="100%" size="sm" />
        </Flex>
        {/* <Grid w="100%" gutter={0} bg="dark">
          <Grid.Col span={{ xs: 3 }}> */}
        <Flex mt="80px" mih="calc(100dvh - 80px)">
          <Flex pos="fixed" left="0" top="80px" w="250px" h="100%" bg="dark">
            <Flex w="100%" direction="column" mr={1} py={10} gap={20}>
              {/* <Box
                c="#273535"
                bg="#F9E1E1"
                p="10px"
                fz="xl"
                onClick={() => navigate("home")}>
                <img
                  src={homeIcon}
                  style={{
                    color: "black",
                    height: "1.2rem",
                    width: "1rem",
                    marginRight: "10px",
                  }}
                  alt="home"
                />
                Home
              </Box> */}
              <Box
                c="#273535"
                bg="#F9E1E1"
                p="10px"
                fz="xl"
                onClick={() => navigate("feed")}>
                <img
                  src={feedIcon}
                  style={{
                    color: "black",
                    height: "1.2rem",
                    width: "1rem",
                    marginRight: "10px",
                  }}
                  alt="feed"
                />
                Feed
              </Box>
              <Box
                c="#273535"
                bg="#F9E1E1"
                p="10px"
                fz="xl"
                onClick={() => navigate("messages")}>
                <img
                  src={messageIcon}
                  style={{
                    color: "black",
                    height: "1.2rem",
                    width: "1rem",
                    marginRight: "10px",
                  }}
                  alt="messages"
                />
                Messages
              </Box>
            </Flex>

            <Divider orientation="vertical" size="sm" h="100%" />
          </Flex>
          <Box ml="250px" w="calc(100% - 250px)" mih="auto" bg="dark">
            <Outlet />
          </Box>
        </Flex>
        {/* </Grid.Col> */}

        {/* <Grid.Col span={10}> */}
        {/* </Grid.Col>
        </Grid> */}

        <Affix position={{ bottom: 100, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftSection={<Image src={arrowUpIcon} w="1rem" h="1rem" />}
                style={transitionStyles}
                onClick={() => scrollTo({ y: 0 })}>
                Scroll to top
              </Button>
            )}
          </Transition>
        </Affix>
      </Box>
    </>
  );
};
export default Dashboard;
