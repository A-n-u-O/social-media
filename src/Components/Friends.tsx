import { Avatar, Box, List } from "@mantine/core";
const FriendsList = [
  { name: "Mathew Kent", profile: "MK" },
  { name: "David Caesar", profile: "DC" },
  { name: "Michael Jordan", profile: "MJ" },
  { name: "Samantha Logan", profile: "SL" },
  { name: "Spencer James", profile: "SJ" },
  { name: "Flying Monkey", profile: "FM" },
  { name: "Marsai Martin", profile: "MM" },
  { name: "James Arthur", profile: "JA" },
  { name: "Selena Gomez", profile: "SG" },
  { name: "Princess Daisy", profile: "PD" },
];

const Friends = () => {
  return (
    <Box>
        {FriendsList.map((friend, index) => (
          <List
            type="ordered"
            center
            icon={<Avatar radius="xl">{friend.profile}</Avatar>}>
            <List.Item
              value={friend.name}
              key={index}
              style={{
                backgroundColor: "#fde1e1e7",
                marginTop: "10px",
                color: "black",
                padding: "5px",
                borderRadius: "10px",
                cursor: "pointer"
              }}>
              {friend.name}
            </List.Item>
          </List>
        ))}
    </Box>
  );
};
export default Friends;
