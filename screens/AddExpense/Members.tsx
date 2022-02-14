import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Color from "../../enum/Color";
import Font from "../../enum/Font";
import { addFriend } from "../../redux/reducers/expense";
import { RootState } from "../../redux/store";

export default function Members() {
  const {
    expense: { users },
  } = useSelector((state: RootState) => state);
  const [friendName, setFriendName] = useState("");
  const dispatch = useDispatch();

  return (
    <View style={{ marginTop: 10 }}>
      <View
        style={{
          marginBottom: 10,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Text style={{ fontSize: 18, fontFamily: Font.regular }}>
          With {}
          <Text style={{ fontFamily: Font.bold }}>You</Text>
          {} and ...
        </Text>
      </View>

      {/* Add friend */}
      <TextInput
        onChangeText={(txt) => setFriendName(txt)}
        value={friendName}
        placeholder="Add a friend"
        style={{
          borderWidth: 1,
          borderColor: Color.darkLight,
          borderRadius: 10,
          height: 45,
          paddingHorizontal: 10,
          fontFamily: Font.regular,
          fontSize: 18,
          marginBottom: 10,
        }}
      />

      {friendName.length > 0 && (
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity onPress={() => dispatch(addFriend(friendName))}>
            <Text>+ Add {friendName}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
