import { View, Text } from "react-native";
import { Menu, useTheme, RadioButton } from "react-native-paper";
import * as React from 'react';
import { TextInput, Button } from 'react-native-paper';
import { useUser } from "./UserContext";

const calculateCalories = (activity: string, distance: number, time: number, weightNumber: number) => {

  const avgSpeed = distance / (time / 60);

  const met = getMETForActivity(activity, avgSpeed)

  return met * weightNumber * (time / 60);
}
const getMETForActivity = (activity: any, avgSpeed: number) =>{
  switch (activity){
    case "Joggen":
      if( 12 <= avgSpeed) return 11.5;
      if( 10 <= avgSpeed) return 10;
      if( 8 <= avgSpeed) return 8.3;
      if( 6.5 <= avgSpeed) return 5;
      if( 5 <= avgSpeed) return 3.8;
      return 0;
    case "Gehen":
      if( 6.5 <= avgSpeed) return 5;
      if( 5 <= avgSpeed) return 3.8;
      if( 3 <= avgSpeed) return 2.3;
      return 0;
    case "Schwimmen": 
      if( 5 <= avgSpeed) return 8;
      if( 0 < avgSpeed) return 6;
      return 0;
    case "Fahrrad fahren":
      if( 22 <= avgSpeed) return 10;
      if( 19 <= avgSpeed) return 8;
      if( 16 <= avgSpeed) return 6;
      return 0;
    default: 
      return 0;
  }
}

export default function SportsUnitScreen() {

  const theme = useTheme();
  const [activityValue, setActivityValue] = React.useState("");
  const [distance, setDistance] = React.useState("");
  const [time, setTime] = React.useState("");
  const [inputError, setInputError] = React.useState(true);
  const { user, setCalories } = useUser();

  const handleSave = () => {
    const distanceNumber = parseFloat(distance);
    const timeNumber = parseFloat(time);
    const weightNumber = user.weight;

    if (!isNaN(distanceNumber) && !isNaN(timeNumber) && activityValue !== "") {
      setInputError(false);
      // Berechnung des Kalorienverbrauchs
      const calculatedCalories = calculateCalories(activityValue, distanceNumber, timeNumber, weightNumber || 0);
      setCalories(prevCalories => prevCalories + calculatedCalories); //prevCalories => prevCalories + calculatedCalories (zum addieren)
      // Hier kannst du den Wert speichern, z.B. in einem globalen Zustand oder über eine API
    } else {
      setInputError(true);
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.primary ,flex: 1, justifyContent: "flex-start", alignItems: "center", }}>
      <Text style={{ color: theme.colors.secondary, margin: 15 }} >Man kann erst speichern, wenn in jedem Feld ein korrekter Wert angegeben wurde. </Text>
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
    <Button mode="contained" onPress={handleSave} style= {{
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