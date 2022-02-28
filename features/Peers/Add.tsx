import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Color from "../../enum/Color";
import Font from "../../enum/Font";

interface IAddProps {
  toggle: () => void;
  editing: boolean;
  submit: (name: string) => void;
}

export default function Add({ editing, toggle, submit }: IAddProps) {
  const [friendName, setFriendName] = useState("");

  const handleSubmit = () => {
    submit(friendName);
    toggle();
    setFriendName("");
  };

  return (
    <View
      style={{
        borderWidth: 1,
        borderColor: Color.darkLight,
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 10,
        marginRight: 10,
        marginBottom: 5,
      }}
    >
      {!editing ? (
        <Pressable
          onPress={toggle}
          style={{
            backgroundColor: "transparent",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "black",
              fontFamily: Font.regular,
            }}
          >
            + Add a friend
          </Text>
        </Pressable>
      ) : (
        <TextInput
          autoFocus
          style={{
            fontSize: 16,
            color: "black",
            fontFamily: Font.regular,
            minWidth: 80,
          }}
          placeholder="Friend's name"
          value={friendName}
          onChangeText={(txt) => setFriendName(txt)}
          onSubmitEditing={handleSubmit}
          onBlur={toggle}
        />
      )}
    </View>
  );
}
