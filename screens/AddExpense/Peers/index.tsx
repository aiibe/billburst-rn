import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Color from "../../../enum/Color";
import Font from "../../../enum/Font";
import { IUser } from "../../../redux/types/user";
import Add from "./Add";

interface IPeersProps {
  peers: IUser[];
  lender: IUser | null;
  setLender: (lender: IUser) => void;
  addPeer: (user: IUser) => void;
}

export default function Peers({
  peers,
  lender,
  setLender,
  addPeer,
}: IPeersProps) {
  const [editing, setEditing] = useState(false);

  return (
    <View style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
      {peers.map((user, idx) => (
        <Pressable
          key={idx}
          onPress={() => setLender(user)}
          style={{
            backgroundColor: lender === user ? Color.primary : Color.grayLight,
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
              color: lender === user ? "white" : "black",
              fontFamily: Font.bold,
            }}
          >
            {user.username}
          </Text>
        </Pressable>
      ))}
      {/* <Add
        submit={addPeer}
        editing={editing}
        toggle={() => setEditing(!editing)}
      /> */}
    </View>
  );
}
