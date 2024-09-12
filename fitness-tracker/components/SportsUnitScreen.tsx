import { View, Text } from "react-native";
import { Menu, useTheme, RadioButton } from "react-native-paper";
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';

export default function SportsUnitScreen() {

  const theme = useTheme();
  const [activityValue, setActivityValue] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [time, setTime] = React.useState("");
  const [inputError, setInputError] = React.useState(true);


  const handleSave = () => {
    const distanceNumber = parseFloat(distance);
    const timeNumber = parseFloat(time)

    if (!isNaN(distanceNumber) && !isNaN(timeNumber) && (activityValue != "")) {
      setInputError(false);
    } else{
      setInputError(true);
    }
  }

  return (
    <View style={{ backgroundColor: theme.colors.primary ,flex: 1, justifyContent: "flex-start", alignItems: "center", }}>
      <Text style={{ color: theme.colors.secondary, margin: 15 }} >Man kann erst speichern wenn in jedem Feld ein Korrekter Wert angegeben wurde. </Text>
      <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 15 }}>Aktivität</Text>
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
    {/* Der Button muss onPress() noch modifiziert werden. */}
    <Button mode="contained" onPress={() => console.log(handleSave)} style= {{
      justifyContent: "center",
      borderWidth: 1,
      borderColor: theme.colors.secondary,
      width: 182,
      height: 50,
      marginTop: 30
    }}>
    Speichern
  </Button>
    </View>
  );
  }