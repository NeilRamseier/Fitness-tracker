import { View, Text } from "react-native";
import { Menu, useTheme, RadioButton } from "react-native-paper";
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function SportsUnitScreen() {

  const theme = useTheme();
  const [activityValue, setActivityValue] = React.useState('Ihre Aktivität');
  const [distance, setDistance] = React.useState("");
  const [time, setTime] = React.useState("");



  return (
    <View style={{ backgroundColor: theme.colors.primary ,flex: 1, justifyContent: "flex-start", alignItems: "center", }}>
      <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Aktivität</Text>
      <View style={{ backgroundColor: theme.colors.secondary, justifyContent: "flex-start", height: 200, marginTop: 15 }}>
      <RadioButton.Group onValueChange={activityValue => setActivityValue(activityValue)} value={activityValue} >
        <RadioButton.Item label="Joggen" value="Joggen" />
        <RadioButton.Item label="Fahrrad fahren" value="Fahrrad fahren" />
        <RadioButton.Item label="Schwimmen" value="Schwimmen" />
       <RadioButton.Item label="Gehen" value="Gehen" />
      </RadioButton.Group>
      </View>
      <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Strecke</Text>
      <TextInput
      style = {{
        marginTop: 15,
        width: 182,
        height: 50
      }}
      placeholder="Km"
      value={distance}
      onChangeText={distance => setDistance(distance)}
    />
          <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Dauer</Text>
      <TextInput
      style = {{
        marginTop: 15,
        width: 182,
        height: 50
      }}
      placeholder="min"
      value={time}
      onChangeText={time => setTime(time)}
    />
    <Button mode="contained" onPress={() => console.log('Pressed')} style= {{
      borderColor: theme.colors.secondary,
      width: 182,
      height: 50,
      marginTop: 50
    }}>
    Speichern
  </Button>
    </View>
  );
  }