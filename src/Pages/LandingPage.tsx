import { Button, Flex, Image, Stack, Text, Transition } from "@mantine/core";
import { Link } from "react-router-dom";
import LandingPageBackground from "../assets/landingPage.avif";

const LandingPage = ({ opened }: { opened: boolean }) => {
  return (
    <Flex h="auto" w="100%" bg="#DFCBDA" justify="center" align="center" color="#000000">
      <Image
        radius="md"
        h="750px"
        w="auto"
        fit="contain"
        src={LandingPageBackground}
      />
      <Stack style={{ alignItems: "flex-start" }} m="auto">
        <Transition
          mounted={opened}
          transition="fade-down"
          duration={400}
          timingFunction="ease">
          {(styles) => (
            <Text c="#004080" size="2.5rem" style={styles}>
              The Friendship Zone
            </Text>
          )}
        </Transition>
        <Transition
          mounted={opened}
          transition="fade-down"
          duration={400}
          timingFunction="ease">
          {(styles) => (
            <Button
              variant="filled"
              color="#004080"
              size="xl"
              radius="md"
              m="5px"
              w="400px"
              component={Link}
              to="/SignUpPage"
              style={{
                ...styles,
                textDecoration: "none",
                fontStyle: "italic",
                color: "white",
              }}
            >
              Sign Up
            </Button>
          )}
        </Transition>
        <Transition
          mounted={opened}
          transition="fade-down"
          duration={400}
          timingFunction="ease">
          {(styles) => (
            <Button
              variant="filled"
              color="#004080"
              size="xl"
              radius="md"
              m="5px"
              w="400px"
              component={Link}
              to="/LogInPage"
              style={{
                ...styles,
                textDecoration: "none",
                fontStyle: "italic",
                color: "white",
              }}
            >
              Log In
            </Button>
          )}
        </Transition>
      </Stack>
    </Flex>
  );
};
export default LandingPage;
