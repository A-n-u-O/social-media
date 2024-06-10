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
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";
import { getDecodedJwt } from "../Components/helper";

const LogInPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },
    validate: {
      email: isEmail("Invalid email"),
    },
  });

  const handleSubmit = async (values: any) => {
    try {
      const response = await axios.post(
        "https://femmetech-backend.onrender.com/api/signin",
        { email: values.email, password: values.password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      const data = response.data;
      localStorage.setItem("token", data.token);
      notifications.show({
        message: "Success !",
      });
      notifications.show({
        message: "Welcome !",
      });
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error", error);
      setError("Invalid email or password");
      notifications.show({
        title: "Login error",
        message: "An error occurred. Please try again.",
      });
    }
  };
  const decodedUser = getDecodedJwt();

  if (decodedUser) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Box w="100%" h="100vh" mx="auto" ta="center" bg="#F9E2E2" lts="1px">
      <Text size="3rem" p="20px" lts="3px">
        Login to your account
      </Text>
      <Divider p="md" />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ maxWidth: "500px", margin: "auto" }}>
        <Grid grow>
          <Grid.Col span={12}>
            <TextInput
              variant="filled"
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
              variant="filled"
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
          {error && (
            <Grid.Col span={12}>
              <Text color="red" size="sm">
                {error}
              </Text>
            </Grid.Col>
          )}
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
          to="/signUpPage"
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
