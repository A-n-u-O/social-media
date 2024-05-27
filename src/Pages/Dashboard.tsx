import {
  Affix,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
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
import homeIcon from "../assets/homeIcon.svg";
import messageIcon from "../assets/messageIcon.svg";
import feedIcon from "../assets/feedIcon.svg";
import { useWindowScroll } from "@mantine/hooks";
import { forwardRef } from "react";
const Dashboard = () => {
  const navigate = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();

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
          <Avatar src={image} radius="xl" />

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
      <Box w="100dvw" h="100dvw" c="#F9E2E2">
        <Flex p="md" direction="row" justify="space-between" bg="dark">
          <Box fz="xl">The FriendShip Zone</Box>
          {/* profile */}
          <Menu withArrow>
            <Menu.Target>
              <UserButton
                image="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                name="Harriette Spoonlicker"
                email="hspoonlicker@outlook.com"
              />
            </Menu.Target>
            <Menu.Dropdown>
              <MenuItem
                leftSection={
                  <Avatar
                    src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png"
                    radius="xl"
                    size="sm"
                  />
                }>
                <MenuLabel>View profile</MenuLabel>
              </MenuItem>
              <MenuItem leftSection={<img src={chevronRightIcon} />}>
                <MenuLabel onClick={() => navigate("/")}>Logout</MenuLabel>
              </MenuItem>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Divider />
        <Grid h="100Vw" bg="dark">
          <Grid.Col span="auto">
            <Flex
              m={"15px"}
              direction="column"
              justify="space-between"
              gap="20px">
              <Button
                c="#273535"
                bg="#F9E1E1"
                p="5px"
                fz="lg"
                fullWidth
                onClick={() => navigate("Home")}
                rightSection={
                  <img
                    src={homeIcon}
                    style={{ color: "black", height: "1.2rem", width: "1rem" }}
                    alt="home"
                  />
                }>
                Home
              </Button>
              <Button
                c="#273535"
                bg="#F9E1E1"
                p="5px"
                fz="lg"
                fullWidth
                leftSection={
                  <img
                    src={feedIcon}
                    style={{ color: "black", height: "1.2rem", width: "1rem" }}
                    alt="feed"
                  />
                }
                onClick={() => navigate("Feed")}>
                Feed
              </Button>
              <Button
                c="#273535"
                bg="#F9E1E1"
                p="5px"
                fz="lg"
                fullWidth
                rightSection={
                  <img
                    src={messageIcon}
                    style={{ color: "black", height: "1.2rem", width: "1rem" }}
                    alt="messages"
                  />
                }
                onClick={() => navigate("messages")}>
                Messages
              </Button>
            </Flex>
          </Grid.Col>
          <Divider orientation="vertical" size="lg" />
          <Grid.Col span={10}>
            <Outlet />
          </Grid.Col>
        </Grid>

        <Affix position={{ bottom: 50, right: 20 }}>
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
