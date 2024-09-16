import React, { useEffect, useState } from "react";
import { Alert, ScrollView, Text, View } from "react-native";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { createUser, currentUser, changeUserWeight, deleteAllUser, dropDB } from '../App';
import { useUser } from "./UserContext";

type FormErrors = {
  [key: string]: string;
};

export default function ProfileScreen() {
  const theme = useTheme();
  const { user, setUser, setBasal } = useUser();
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });

  useEffect(() => {
    const defaultUser = {
      id: 0,
      first_name: '',
      last_name: '',
      weight: 0,
      height: 0,
      age: 0,
      basal_metabolic_rate: 0,
      gender: 'M',
      IP: '',
      creation_date: ''
    };

    const loadedUser = currentUser ? {
      id: currentUser.id ?? defaultUser.id,
      first_name: currentUser.first_name ?? defaultUser.first_name,
      last_name: currentUser.last_name ?? defaultUser.last_name,
      weight: currentUser.weight ?? defaultUser.weight,
      height: currentUser.height ?? defaultUser.height,
      age: currentUser.age ?? defaultUser.age,
      basal_metabolic_rate: currentUser.basal_metabolic_rate ?? defaultUser.basal_metabolic_rate,
      gender: currentUser.gender ?? defaultUser.gender,
      IP: currentUser.IP ?? defaultUser.IP,
      creation_date: currentUser.creation_date ?? defaultUser.creation_date,
    } : defaultUser;

    setUser(loadedUser);
  }, [setUser]);

  useEffect(() => {
    validateForm();
  }, [user]);

  const validateForm = () => {
    let formErrors: FormErrors = { firstName: '', lastName: '', age: '', weight: '', height: '', gender: '' };

    if (!user?.first_name) formErrors.firstName = 'Vorname ist notwendig.';
    if (!user?.last_name) formErrors.lastName = 'Nachname ist notwendig.';
    if (!user?.age) formErrors.age = 'Alter ist notwendig.';
    if (!user?.weight) formErrors.weight = 'Gewicht ist notwendig.';
    if (!user?.height) formErrors.height = 'Grösse ist notwendig.';
    if (!user?.gender) formErrors.gender = 'Geschlecht ist notwendig.';

    setErrors(prevErrors => {
      const hasChanges = Object.keys(formErrors).some(key => formErrors[key] !== prevErrors[key]);
      if (hasChanges) {
        setIsFormValid(Object.values(formErrors).every(error => error === ''));
        return formErrors;
      }
      return prevErrors;
    });
  };
  

  const calculateBasal = (gender: string, weight: number, age: number, height: number) => {
    if (gender === "M") {
      return Math.round(66.47 + (13.7 * weight) + (5 * height) - (6.8 * age));
    }
    return Math.round(655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
  };

  const handleChangeWeight = (newWeight: string) => {
    const parsedWeight = parseFloat(newWeight);
    if (!isNaN(parsedWeight)) {
      changeUserWeight(parsedWeight);
      handleChange('weight', newWeight);
    }
  };

  const dropDatabase = async () => {
    dropDB();
  }

  const handleSave = async () => {
    if (!user) return;
    const firstName = user.first_name || '';
    const lastName = user.last_name || '';
    const weight = parseFloat(user.weight?.toString() || '');
    const height = parseInt(user.height?.toString() || '', 10);
    const age = parseInt(user.age?.toString() || '', 10);
    const gender = user.gender || 'O';
    const basalMetabolicRate = calculateBasal(gender, weight, age, height);
  

    if (!firstName || !lastName || isNaN(weight) || isNaN(height) || isNaN(age) || !gender) {
      console.error('Einige Felder sind ungültig.');
      return;
    }
  
    await createUser(
      firstName,
      lastName,
      weight,
      height,
      age,
      basalMetabolicRate,
      gender
    );

    setUser((prevUser) => ({
      ...prevUser,
      basal_metabolic_rate: basalMetabolicRate,
    }));
  
    setBasal(basalMetabolicRate);

    Alert.alert(
      'Erfolg',
      'Benutzer wurde erfolgreich gespeichert.',
      [{ text: 'OK' }]
    );
  };
  

  const handleDeleteAllUsers = () => {
    deleteAllUser();
    alert('Alle Benutzer wurden gelöscht.');
  };

  const handleChange = (field: string, value: any) => {
    setUser((prevUser: any) => ({
      ...prevUser,
      [field]: value
    }));
  };

  return (
    <ScrollView bounces={false}>
      <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!isFormValid && (
          <Text style={{ color: 'red', margin: 15 }}>
            Man kann erst speichern, wenn in jedem Feld ein korrekter Wert angegeben wurde.
          </Text>
        )}

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Vorname</Text>
        <TextInput
          style={{ marginTop: 15, width: 182, height: 50 }}
          placeholder="Vorname"
          value={user?.first_name || ""}
          onChangeText={(value) => handleChange('first_name', value)}
        />

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Nachname</Text>
        <TextInput
          style={{ marginTop: 15, width: 182, height: 50 }}
          placeholder="Nachname"
          value={user?.last_name || ""}
          onChangeText={(value) => handleChange('last_name', value)}
        />

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Alter</Text>
        <TextInput
          keyboardType="numeric"
          style={{ marginTop: 15, width: 182, height: 50 }}
          placeholder="Alter"
          value={user?.age?.toString() === "0" ? "" : user?.age?.toString() || ""}
          onChangeText={(value) => handleChange('age', value)}
        />

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Gewicht</Text>
        <TextInput
          keyboardType="numeric"
          style={{ marginTop: 15, width: 182, height: 50 }}
          placeholder="Gewicht"
          value={user?.weight?.toString() === "0" ? "" : user?.weight?.toString() || ""}
          onChangeText={(value) => handleChangeWeight(value)}
        />

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Grösse</Text>
        <TextInput
          keyboardType="numeric"
          style={{ marginTop: 15, width: 182, height: 50 }}
          placeholder="Grösse (cm)"
          value={user?.height?.toString() === "0" ? "" : user?.height?.toString() || ""}
          onChangeText={(value) => handleChange('height', value)}
        />

        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Geschlecht</Text>
        <View style={{ backgroundColor: theme.colors.secondary, justifyContent: "flex-start", height: 'auto', marginTop: 15 }}>
          <RadioButton.Group
            onValueChange={(value) => handleChange('gender', value)}
            value={user?.gender || ""}
          >
            <RadioButton.Item label="Männlich" value="M" />
            <RadioButton.Item label="Weiblich" value="F" />
          </RadioButton.Group>
        </View>

        <Button
          mode="outlined"
          onPress={handleSave}
          textColor={theme.colors.secondary}
          disabled={!isFormValid}
          style={{
            borderColor: theme.colors.secondary,
            width: 182,
            height: 50,
            marginTop: 50,
            marginBottom: 20
          }}
        >
          Speichern
        </Button>
        <Button onPress={dropDatabase} textColor={theme.colors.secondary}><Text>Drop DB!</Text></Button>
        <Button onPress={handleDeleteAllUsers} textColor={theme.colors.secondary}>Alle Benutzer löschen</Button>
        
      </View>
    </ScrollView>
  );
}
