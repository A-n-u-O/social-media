import { Box, Flex, Text } from "@mantine/core";

type ChatsProps = {
  messages: {
    text: string;
    date: string;
  }[];
};
const Chats = ({ messages }: ChatsProps) => {
  return (
    <>
      <Flex direction="column" gap="md">
        {messages.map((message, index) => (
          <Box
            pos="absolute"
            top={`calc(-500px + ${index * 80}px)`}
            right="90px"
            w="auto">
            <Box
              key={index}
              p="md"
              bg="grey"
              style={{
                borderRadius: "6px",
                boxShadow:
                  "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              }}>
              <Text>{message.text}</Text>
            </Box>
            <Text size="xs" c="gray">
              {message.date}
            </Text>
          </Box>
        ))}
      </Flex>
    </>
  );
};
export default Chats;
