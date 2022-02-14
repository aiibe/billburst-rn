import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import AddFriend from "./AddFriend";

export default function Friends({
  users,
  selected,
  changeUser,
}: {
  users: { name: string }[];
  selected: string;
  changeUser: (name: string) => void;
}) {
  const [addingUser, setAddingUser] = useState(false);
  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {users.map((user, idx) => (
        <Pressable
          key={idx}
          onPress={() => changeUser(user.name)}
          style={{
            backgroundColor:
              selected === user.name ? Color.primary : Color.grayLight,
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
              color: selected === user.name ? "white" : "black",
              fontFamily: Font.bold,
            }}
          >
            {user.name}
          </Text>
        </Pressable>
      ))}
      <AddFriend
        editing={addingUser}
        toggle={() => setAddingUser(!addingUser)}
      />
    </View>
  );
}
