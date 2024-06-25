import {
  Box,
  Button,
  Checkbox,
  Divider,
  FileButton,
  Flex,
  Grid,
  Group,
  Image,
  PasswordInput,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import { isEmail, useForm } from "@mantine/form";
import at from "../assets/iconAt.svg";
import imageIcon from "../assets/iconImage.svg";
import doneIcon from "../assets/checkIcon.svg";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { notifications } from "@mantine/notifications";

// type SignUpPageProps = {
//   name: [firstName: string, lastName: string];
//   email: string;
//   password: string;
//   profilePicture: File;
// };

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
  const navigate = useNavigate();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [profilePictureUrl, setProfilePictureUrl] = useState<null | string>(
    null
  );
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (profilePicture) {
      setProfilePictureUrl(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);

  const resetRef = useRef<() => void>(null);
  const clearFile = () => {
    setProfilePicture(null);
    resetRef.current?.();
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handlePasswordFormat = (password: string) => {
    switch (true) {
      case password.length < 8:
        setError("Password must be at least 8 characters long");
        setIsButtonDisabled(true);
        break;
      case !/[a-z]/.test(password):
        setError("Password must contain at least one lowercase letter");
        setIsButtonDisabled(true);
        break;
      case !/[A-Z]/.test(password):
        setError("Password must contain at least one uppercase letter");
        setIsButtonDisabled(true);
        break;
      case !/\d/.test(password):
        setError("Password must contain at least one digit");
        setIsButtonDisabled(true);
        break;
      case !/[@#$%^&*!]/.test(password):
        setError(
          "Password must contain at least one special character (@#$%^&*!)"
        );
        setIsButtonDisabled(true);
        break;
      default:
        setError(null);
        setIsButtonDisabled(false);
    }
  };

  const handleSubmit = async (values: any) => {
    handlePasswordFormat(values.password);
    if (error) return;

    const formData = new FormData();
    if (
      values.firstName.trim() !== "" &&
      values.lastName.trim() !== "" &&
      values.password.trim() !== "" &&
      values.email.trim() !== ""
    ) {
      formData.append("firstname", values.firstName);
      formData.append("lastname", values.lastName);
      formData.append("phone", "08100000000")
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("role", "PATIENT");
      if (profilePicture) {
        formData.append("files", profilePicture);
      }
      try {
        const response = await axios.post(
          "https://femmetech-backend.onrender.com/api/signup",
          formData,
          {
            headers: {
              "Content-type": "multipart/form-data",
            },
          }
        );
        console.log(response.data);
        notifications.show({
          title: 'Success',
          message: 'Sign Up Successful! 🤥',
        })
        navigate("/logInPage");
      } catch (error) {
        console.error("error occurred", error);
        setError("An error occurred during sign up. Please try again.");
        notifications.show({
          title: 'error occurred',
          message: 'An error occurred during sign up. Please try again.',
        })
      }
    } else {
      alert("please fill all asterisked fields");
    }
  };

  return (
    <Box w="100%" h="100%" ta="center" mx="auto" bg="#F9E2E2" lts="1px">
      <Text size="2.8rem" p="20" lts="3px">
        The Friendship Zone{" "}
        <Text c="#004080" p="md" fw="bold" component="span">
          Sign Up
        </Text>
      </Text>
      <Divider p="md" />
      <form
        onSubmit={form.onSubmit(handleSubmit)}
        style={{ maxWidth: "600px", margin: "auto" }}>
        <Grid grow>
          <Grid.Col span={12}>
            <TextInput
              variant="filled"
              mt="sm"
              size="lg"
              withErrorStyles
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
              variant="filled"
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
              variant="filled"
              mt="sm"
              size="lg"
              radius="sm"
              label="Email"
              placeholder="xyz@example.com"
              type="email"
              required
              rightSectionPointerEvents="none"
              rightSection={<Image w="1rem" h="1rem" src={at} />}
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              variant="filled"
              mt="sm"
              size="lg"
              radius="sm"
              label="Password"
              placeholder="Password"
              required
              value={password}
              onChange={(event) => {
                const value = event.currentTarget.value;
                setPassword(value);
                handlePasswordFormat(value);
                form.setFieldValue("password", value);
              }}
            />
            <Flex align="center" mt={2}>
              <Flex
                align="center"
                style={{
                  color: /[A-Z]/.test(password) ? "blue" : "grey",
                  fontSize: "10px",
                  margin: "8px",
                  padding: "8px",
                }}>
                <Image src={doneIcon} h="1rem" w="1rem" /> Uppercase
              </Flex>
              <Flex
                align="center"
                style={{
                  color: /[a-z]/.test(password) ? "blue" : "grey",
                  fontSize: "10px",
                  margin: "8px",
                  padding: "8px",
                }}>
                <Image src={doneIcon} h="1rem" w="1rem" /> Lowercase
              </Flex>
              <Flex
                style={{
                  color: /\d/.test(password) ? "blue" : "grey",
                  fontSize: "10px",
                  margin: "8px",
                  padding: "8px",
                }}>
                <Image src={doneIcon} h="1rem" w="1rem" /> At least one number
              </Flex>
              <Flex
                style={{
                  color: password.length >= 8 ? "blue" : "grey",
                  fontSize: "10px",
                  margin: "8px",
                  padding: "8px",
                }}>
                <Image src={doneIcon} h="1rem" w="1rem" /> 8 or more characters
              </Flex>
              <Flex
                style={{
                  color: /[@#$%^&*!]/.test(password) ? "blue" : "grey",
                  fontSize: "10px",
                  margin: "8px",
                  padding: "8px",
                }}>
                <Image src={doneIcon} h="1rem" w="1rem" /> Special character
              </Flex>
            </Flex>
          </Grid.Col>
          <Grid.Col span={6}>
            <PasswordInput
              variant="filled"
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
            <FileButton
              resetRef={resetRef}
              onChange={(e) => setProfilePicture(e)}
              accept="image/png,image/jpeg">
              {(props) => (
                <Button
                  {...props}
                  variant="gradient"
                  gradient={{ from: "blue", to: "violet", deg: 90 }}
                  leftSection={
                    <Image
                      src={imageIcon}
                      alt="upload image"
                      w="1rem"
                      h="1rem"
                    />
                  }>
                  Upload image
                </Button>
              )}
            </FileButton>
            <Button
              component="span"
              disabled={!profilePicture}
              color="blue"
              onClick={clearFile}
              ml="10px">
              Reset
            </Button>
            {profilePictureUrl && profilePicture && (
              <Box mt={2} ta="center">
                <Box>Profile Picture Preview:</Box>
                <Image src={profilePictureUrl} h="100px" />
              </Box>
            )}
          </Grid.Col>
          <Grid.Col span={6}>
            <Checkbox
              label="I accept terms & conditions"
              mt="sm"
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
                type="submit"
                disabled={isButtonDisabled}>
                Sign Up
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
      <Text c="blue" m="12px">
        Already have an account?{" "}
        <Link
          to="/logInPage"
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
