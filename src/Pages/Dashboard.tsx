import {
  Affix,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Text,
  Transition,
  rem,
} from "@mantine/core";
import { Outlet, useNavigate } from "react-router";
import arrowUpIcon from "../assets/arrowUpIcon.svg";
import { useWindowScroll } from "@mantine/hooks";
const Dashboard = () => {
  const navigate = useNavigate();
  const [scroll, scrollTo] = useWindowScroll();
  return (
    <>
      <Box w="auto" h="100%">
        <Flex pt="sm" pb="md" direction="row" justify="flex-end" bg="ACC3C3">
          {/* profile */}
          <Avatar src={null} alt="no image here" radius="xl" size="2.5rem" />
        </Flex>
        <Divider />
        <Grid  h= "90%">
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
