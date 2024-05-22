import {
  Box,
  Button,
  Divider,
  Grid,
  Group,
  PasswordInput,
  Text,
  TextInput,
  rem,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import at from "../assets/iconAt.svg";
import { Link } from "react-router-dom";

const LogInPage = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
    validate: {
      email: isEmail("Invalid email"),
      confirmPassword: (value, values) => {
        return value !== values.password ? "passwords don't match" : null;
      },
    },
  });

  return (
    <Box w="100%" h="100vh" mx="auto" ta="center" bg="#F9E2E2" lts='1px'>
      <Text size="3rem" p="20px" lts='3px'>
        Login to your account
      </Text>
      <Divider p="md" />
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        style={{ maxWidth: "500px", margin: "auto" }}>
        <Grid grow>
          <Grid.Col span={12}>
            <TextInput
              mt="sm"
              size="xl"
              radius="lg"
              label="Email"
              placeholder="Email"
              required
              rightSectionPointerEvents="none"
              rightSection={
                <img
                  src={at}
                  alt="@"
                  style={{ width: rem(16), height: rem(16) }}
                />
              }
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <PasswordInput
              mt="sm"
              size="xl"
              radius="lg"
              label="Password"
              placeholder="Password"
              required
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Grid.Col>

          <Grid.Col span={6}>
            <Group justify="flex-end" mt="md">
              <Button
                color="#004080"
                size="md"
                radius="sm"
                w="200px"
                type="submit">
                Log In
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Text c="blue" m="12px">
        Don't have an account?{" "}
        <Link
          to="/SignUpPage"
          style={{
            textDecoration: "underline",
            color: "black",
            fontWeight: "bold",
            padding: "5px",
          }}>
          Sign Up
        </Link>
      </Text>
    </Box>
  );
};
export default LogInPage;
