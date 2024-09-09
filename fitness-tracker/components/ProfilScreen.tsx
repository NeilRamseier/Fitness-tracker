import React from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

export default function ProfilScreen() {
  const [text, setText] = React.useState("");

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <TextInput
        label="Name"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Alter"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Gewicht"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Grösse"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <TextInput
        label="Geschlecht"
        mode="outlined"
        value={text}
        onChangeText={(text) => setText(text)}
      />
    </View>
  );
}
