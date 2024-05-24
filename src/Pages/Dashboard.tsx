import {
  Affix,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  Menu,
  MenuDropdown,
  MenuItem,
  MenuLabel,
  Text,
  Transition,
  UnstyledButton,
  rem,
} from "@mantine/core";
import { Outlet, useNavigate } from "react-router";
import arrowUpIcon from "../assets/arrowUpIcon.svg";
import chevronRightIcon from "../assets/chevronRightIcon.svg";
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
            <Text size="sm" fw={500}>
              {name}
            </Text>

            <Text c="dimmed" size="xs">
              {email}
            </Text>
          </div>

          {icon || (
            <img
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
      <Box w="auto" h="100%">
        <Flex pt="sm" pb="md" direction="row" justify="flex-end" bg="ACC3C3">
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
                  <Avatar src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-8.png" radius="xl" size="sm"/>
                }>
                <MenuLabel>View profile</MenuLabel>
              </MenuItem>
              <MenuItem leftSection={
                <img src={chevronRightIcon}/>
              }>
                <MenuLabel>Logout</MenuLabel>
              </MenuItem>
            </Menu.Dropdown>
          </Menu>
        </Flex>
        <Divider />
        <Grid h="90%">
          <Grid.Col span="auto">
            <Box m={"15px"}>
              <Text onClick={() => navigate("Home")}>Home</Text>
              <Text onClick={() => navigate("Feed")}>Feed</Text>
              <Text onClick={() => navigate("Messages")}>Messages</Text>
            </Box>
          </Grid.Col>
          <Divider orientation="vertical" size="lg" />
          <Grid.Col span={10}>
            <Outlet />
          </Grid.Col>
        </Grid>

        <Affix position={{ bottom: 20, right: 20 }}>
          <Transition transition="slide-up" mounted={scroll.y > 0}>
            {(transitionStyles) => (
              <Button
                leftSection={
                  <img
                    src={arrowUpIcon}
                    style={{ width: rem(16), height: rem(16) }}
                  />
                }
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
