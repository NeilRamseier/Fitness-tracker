import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { insertUser } from '../database/sqlight'; // Pfad zur Datenbankdatei anpassen

const CreateProfile = () => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [basalMetabolism, setBasalMetabolism] = useState('');
  const [gender, setGender] = useState('');

  const handleSubmit = () => {
    if (!firstname || !lastname || !weight || !height || !basalMetabolism || !gender) {
      Alert.alert('Fehler', 'Bitte fülle alle Felder aus.');
      return;
    }

    insertUser(
      firstname,
      lastname,
      parseFloat(weight),
      parseFloat(height),
      parseFloat(basalMetabolism),
      gender
    );

    Alert.alert('Erfolg', 'Profil erfolgreich erstellt.');
    // Optionale: Zurücksetzen der Felder oder Navigieren zu einer anderen Seite
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil erstellen</Text>

      <TextInput
        style={styles.input}
        placeholder="Vorname"
        value={firstname}
        onChangeText={setFirstname}
      />
      <TextInput
        style={styles.input}
        placeholder="Nachname"
        value={lastname}
        onChangeText={setLastname}
      />
      <TextInput
        style={styles.input}
        placeholder="Gewicht (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Größe (cm)"
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Grundverbrauch (kcal)"
        keyboardType="numeric"
        value={basalMetabolism}
        onChangeText={setBasalMetabolism}
      />
      <TextInput
        style={styles.input}
        placeholder="Geschlecht (m/f/divers)"
        value={gender}
        onChangeText={setGender}
      />

      <Button title="Profil erstellen" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default CreateProfile;
