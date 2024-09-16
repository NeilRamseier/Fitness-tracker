import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as React from 'react';
import { useTheme, Surface, Icon } from "react-native-paper";
import { Pedometer } from "expo-sensors";
import { changeUserWeight, currentUser } from "../App";
import { useUser } from "./UserContext";

export default function HomeScreen() {
  const theme = useTheme();
  const { user, setUser, basal  } = useUser();
  const [counter, setCounter] = React.useState<number | null>(null); // null, bis Daten geladen sind
  const [isPedometerAvailable, setIsPedometerAvailable] = React.useState('checking');
  const [stepCount, setStepCount] = React.useState(0);
  const { calories } = useUser();
  const [localBasal, setLocalBasal] = React.useState<number | null>(basal);

  const MIN_COUNT = 0;


  React.useEffect(() => {
    if (user && user.weight) {
      setCounter(user.weight); // Initialisiere Gewicht aus user
    } else {
      setCounter(0.1); // Standardwert, falls kein Benutzer vorhanden
    }
  }, [user]); // Aktiviere, wenn sich currentUser ändert

  // UseEffect to update basal whenever user.basal_metabolic_rate changes
  React.useEffect(() => {
    if (user && user.basal_metabolic_rate) {
      setLocalBasal(user.basal_metabolic_rate);  // Update local basal state
    }
  }, [user]);

  // Pedometermessung initialisieren
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

  // Erhöhe das Gewicht
  const higherCounter = () => {
    if (counter !== null) {
      const newWeight = Math.max(Math.round((counter + 0.1) * 10) / 10, 0.1);
      setCounter(newWeight);
      changeUserWeight(newWeight);
      if (user) {
        setUser({ ...user, weight: newWeight }); 
      }
    }
  };

  // Verringere das Gewicht
  const lowerCounter = () => {
    if (counter !== null) {
      const newWeight = Math.max(Math.round((counter - 0.1) * 10) / 10, 0.1);
      setCounter(newWeight);
      changeUserWeight(newWeight);
      if (user) {
        setUser({ ...user, weight: newWeight }); // Update user context
      }
    }
  };

  return (
    <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "flex-start", alignItems: "center" }}>
      <Text style={{ color: theme.colors.secondary, fontSize: 35, marginTop: 50 }}>Hallo User!</Text>
      
      {/* Schritte anzeigen */}
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

      {/* Kalorienverbrauch anzeigen */}
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
           {localBasal !== null ? `${Math.round((calories ?? 0) + (localBasal ?? 0))} kcal` : "0"}
        </Text>
        {/* Detailverbrauch */}
        <View>
          <Text style={styles.detailText}>Grundverbrauch</Text>
          <Text style={styles.detailText}>{localBasal !== null ? localBasal : "0"} kcal</Text>
          <Text style={styles.detailText}>Aktivitäten</Text>
          <Text style={styles.detailText}>{calories !== null ? `${calories.toFixed(2)} kcal` : "0"}</Text>
        </View>
      </Surface>

      {/* Gewichtsübersicht */}
      <TouchableOpacity onPress={higherCounter} testID="increase-button">
        <View style={[styles.plusAndMinus, { borderColor: theme.colors.secondary }]}>
          <Icon source="plus" color={theme.colors.secondary} size={50} />
        </View>
      </TouchableOpacity>

      {/* Anzeige des Benutzergewichts */}
      <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
        <Text style={{ color: theme.colors.secondary, fontSize: 50, marginBottom: 5 }}>
        {user?.weight !== undefined ? `${user.weight} kg` : "Nicht verfügbar"}
        </Text>
        <Text style={{ color: theme.colors.secondary, fontSize: 15, marginBottom: 5, marginLeft: 5 }}>Kg</Text>
      </View>
      <View style={{ backgroundColor: theme.colors.secondary, height: 1, width: 180, marginBottom: 20 }} />

      <TouchableOpacity onPress={lowerCounter} testID="decrease-button">
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
