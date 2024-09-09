import { View, Text } from "react-native";
import { Menu, useTheme, RadioButton } from "react-native-paper";
import * as React from 'react';

const theme = useTheme();
const [activityValue, setActivityValue] = React.useState('run');

export default function SportsUnitScreen() {

  return (
    <View style={{ backgroundColor: theme.colors.primary ,flex: 1, justifyContent: "center", alignItems: "center" }}>
      <RadioButton.Group onValueChange={activityValue => setActivityValue(activityValue)} value={activityValue}>
        <RadioButton.Item label="Joggen" value="run" />
        <RadioButton.Item label="Fahrrad fahren" value="cycle" />
        <RadioButton.Item label="Schwimmen" value="swim" />
       <RadioButton.Item label="Gehen" value="walk" />
      </RadioButton.Group>
    </View>
  );
  }