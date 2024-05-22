import {
  Box,
  Button,
  Checkbox,
  Divider,
  FileInput,
  Grid,
  Group,
  PasswordInput,
  Text,
  TextInput,
  Textarea,
  rem,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import at from "../assets/iconAt.svg";
import image from "../assets/iconImage.svg";
import { Link } from "react-router-dom";

const SignUpPage = () => {
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
    <Box w="100%" h="100%" ta="center" mx="auto" bg="#F9E2E2" lts="1px">
      <Text size="2.8rem" p="20" lts="3px">
        The Friendship Zone{" "}
        <Text c="#004080" p="md" fw='bold'>
          Sign Up
        </Text>
      </Text>
      <Divider p="md" />
      <form
        onSubmit={form.onSubmit((values) => console.log(values))}
        style={{ maxWidth: "600px", margin: "auto" }}>
        <Grid grow>
          <Grid.Col span={12}>
            <TextInput
              mt="sm"
              size="lg"
              radius="sm"
              label="First Name"
              placeholder="First Name"
              required
              key={form.key("firstName")}
              {...form.getInputProps("firstName")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              mt="sm"
              size="lg"
              radius="sm"
              label="Last Name"
              placeholder="Last Name"
              required
              key={form.key("lastName")}
              {...form.getInputProps("lastName")}
            />
          </Grid.Col>
          <Grid.Col span={12}>
            <TextInput
              mt="sm"
              size="lg"
              radius="sm"
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
          <Grid.Col span={6}>
            <PasswordInput
              mt="sm"
              size="lg"
              radius="sm"
              label="Password"
              placeholder="Password"
              required
              key={form.key("password")}
              {...form.getInputProps("password")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              mt="sm"
              size="lg"
              radius="sm"
              label="Confirm password"
              placeholder="Confirm password"
              required
              key={form.key("confirmPassword")}
              {...form.getInputProps("confirmPassword")}
            />
          </Grid.Col>
          <Grid.Col span="content">
            <Textarea
              label="Bio"
              placeholder="4 rows max"
              autosize
              minRows={2}
              maxRows={4}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <FileInput
              accept="image/png,image/jpeg"
              clearable
              label="Profile picture"
              placeholder="Upload Profile Picture"
              rightSection={
                <img
                  src={image}
                  alt="upload image"
                  style={{ width: rem(16), height: rem(16) }}
                />
              }
              mt="md"
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <Checkbox
              label="I accepts terms & conditions"
              mt="sm"
              required
              key={form.key("terms")}
              {...form.getInputProps("terms", { type: "checkbox" })}
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
                Sign Up
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Text c="blue" m="12px">
        Already have an account?{" "}
        <Link
          to="/LogInPage"
          style={{
            textDecoration: "underline",
            color: "black",
            fontWeight: "bold",
            padding: "5px",
          }}>
          Log In
        </Link>
      </Text>
    </Box>
  );
};
export default SignUpPage;
