import { useState } from "react";
import { View, Pressable, Text } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import AddFriend from "./AddFriend";

interface IFriendsProps {
  users: string[];
  selected: string;
  changeUser: (name: string) => void;
  addUser: (name: string) => void;
}

export default function Friends({
  users,
  selected,
  changeUser,
  addUser,
}: IFriendsProps) {
  const [editing, setEditing] = useState(false);

  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {users.map((name, idx) => (
        <Pressable
          key={idx}
          onPress={() => changeUser(name)}
          style={{
            backgroundColor:
              selected === name ? Color.primary : Color.grayLight,
            paddingHorizontal: 15,
            paddingVertical: 5,
            borderRadius: 10,
            marginRight: 10,
            marginBottom: 5,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              color: selected === name ? "white" : "black",
              fontFamily: Font.bold,
            }}
          >
            {name}
          </Text>
        </Pressable>
      ))}
      <AddFriend
        submit={addUser}
        editing={editing}
        toggle={() => setEditing(!editing)}
      />
    </View>
  );
}
