import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Color from "../../../enum/Color";
import Font from "../../../enum/Font";
import Add from "./Add";

interface IPeersProps {
  peers: string[];
  lender: string;
  setLender: (name: string) => void;
  addPeer: (name: string) => void;
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
      {peers.map((name, idx) => (
        <Pressable
          key={idx}
          onPress={() => setLender(name)}
          style={{
            backgroundColor: lender === name ? Color.primary : Color.grayLight,
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
              color: lender === name ? "white" : "black",
              fontFamily: Font.bold,
            }}
          >
            {name}
          </Text>
        </Pressable>
      ))}
      <Add
        submit={addPeer}
        editing={editing}
        toggle={() => setEditing(!editing)}
      />
    </View>
  );
}
