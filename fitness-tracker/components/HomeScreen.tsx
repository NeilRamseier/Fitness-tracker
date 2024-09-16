import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { useTheme, Surface, Icon } from "react-native-paper";
import { Pedometer } from "expo-sensors";
import { changeUserWeight, currentUser } from "../App";
import { useUser } from "./UserContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, setUser, basal  } = useUser();
  const [counter, setCounter] = React.useState<number | null>(null);
  const [isPedometerAvailable, setIsPedometerAvailable] = React.useState('checking');
  const [stepCount, setStepCount] = React.useState(0);
  const { calories } = useUser();
  const [localBasal, setLocalBasal] = React.useState<number | null>(basal);

  const MIN_COUNT = 0;


  React.useEffect(() => {
    if (user && user.weight) {
      setCounter(user.weight);
    } else {
      setCounter(0.1);
    }
  }, [user]);

  React.useEffect(() => {
    if (user && user.basal_metabolic_rate) {
      setLocalBasal(user.basal_metabolic_rate); 
    }
  }, [user]);

  const subscribe = async () => {
    const isAvailable = await Pedometer.isAvailableAsync();
    setIsPedometerAvailable(String(isAvailable));

    if (isAvailable) {
      const today = new Date();
      const start = new Date(today);
      start.setHours(0, 0, 0, 0);
      const end = new Date(today);
      end.setHours(23, 59, 59, 999);

      const stepCountResult = await Pedometer.getStepCountAsync(start, end);
      setStepCount(stepCountResult.steps);
    }
  };

  React.useEffect(() => {
    const subscription = subscribe();
  }, []);

  const higherCounter = () => {
    console.log("Counter", counter, typeof counter);
    
    if (counter !== null) {
      const newWeight = Math.max(Math.round((counter + 0.1) * 10) / 10, 0.1);
      console.log("Counter2", newWeight, typeof newWeight);
      setCounter(newWeight);
      changeUserWeight(newWeight);
      if (user) {
        setUser({ ...user, weight: newWeight }); 
      }
    }
  };


  const lowerCounter = () => {
    if (counter !== null) {
      const newWeight = Math.max(Math.round((counter - 0.1) * 10) / 10, 0.1);
      setCounter(newWeight);
      changeUserWeight(newWeight);
      if (user) {
        setUser({ ...user, weight: newWeight });
      }
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{ color: theme.colors.secondary, fontSize: 35, marginTop: 50 }}>Hallo {user.first_name}!</Text>
      
      <Surface
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.secondary,
          width: 350,
          height: 80,
          borderWidth: 1,
          borderRadius: 10
        }}
        elevation={3}
      >
        <Text
          style={{
            fontSize: 25,
            color: theme.colors.secondary
          }}
        >
          {stepCount} Schritte
        </Text>
      </Surface>

      <Surface
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: 25,
          marginBottom: 25,
          backgroundColor: theme.colors.primary,
          borderColor: theme.colors.secondary,
          width: 350,
          height: 150,
          borderWidth: 1,
          borderRadius: 10
        }}
        elevation={3}
      >
        <Text
          style={{
            fontSize: 25,
            color: theme.colors.secondary
          }}
        >
           {Math.round((calories ?? 0) + (localBasal ?? 0) + (stepCount * 0.04))} kcal
        </Text>
        <View>
          <Text style={styles.detailText}>Grundverbrauch</Text>
          <Text style={styles.detailText}>{localBasal !== null ? localBasal : "0"} kcal</Text>
          <Text style={styles.detailText}>Aktivitäten</Text> 
          <Text style={styles.detailText}>{Math.round((calories ?? 0) + (stepCount * 0.04))} kcal</Text>
        </View>
      </Surface>

      <TouchableOpacity onPress={higherCounter}>
        <View style={[styles.plusAndMinus, { borderColor: theme.colors.secondary }]}>
          <Icon source="plus" color={theme.colors.secondary} size={50} />
        </View>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ color: theme.colors.secondary, fontSize: 50, marginBottom: 5 }}>
        {user?.weight !== undefined ? `${user.weight}` : "Nicht verfügbar"}
        </Text>
        <Text style={{ color: theme.colors.secondary, fontSize: 15, marginBottom: 5, marginLeft: 5 }}>Kg</Text>
      </View>
      <View style={{ backgroundColor: theme.colors.secondary, height: 1, width: 180, marginBottom: 20 }} />

      <TouchableOpacity onPress={lowerCounter}>
        <View style={[styles.plusAndMinus, { borderColor: theme.colors.secondary }]}>
          <Icon source="minus" color={theme.colors.secondary} size={50} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  detailText: {
    marginTop: 5,
    fontSize: 20,
    color: "#808080"
  },
  plusAndMinus: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  }
});
