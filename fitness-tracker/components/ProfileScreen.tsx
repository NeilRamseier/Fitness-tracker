import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { createUser, deleteAllUser, getAllUser } from '../App';

export default function ProfileScreen() {

  const setupDatabase = async () => {
    createUser('Test', 'Test', 18.9, 189, 16, 'M');
    console.log('UserCreated')
  }

  const giveAllUser = async () => {
    getAllUser();
  }

  const deleteAllUsers = async () => {
    deleteAllUser();
  }
  const theme = useTheme();
  const [name, setName] = React.useState("");
  const [age, setAge] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [gender, setGender] = React.useState("");
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [errors, setErrors] = React.useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });
  useEffect(() => {
    validateForm();
  }, [name, age, weight, height, gender]);

  const validateForm = () => {
    let errors = { name: '', age: '', weight: '', height: '', gender: '' };

    if (!name) {
      errors.name = 'Name ist notwendig.';
    }
    if (!age) {
      errors.age = 'Alter ist notwendig.';
    } if (!weight) {
      errors.weight = 'Gewicht ist notwendig.';
    } if (!height) {
      errors.height = 'Grösse ist notwendig.';
    } if (!gender) {
      errors.gender = 'Geschlecht ist notwendig.';
    }

    setErrors(errors);
    setIsFormValid(Object.values(errors).every(error => error === ''));
  };


  return (
    <ScrollView bounces={false} >
      <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.secondary, margin: 15 }} >Man kann erst speichern, wenn in jedem Feld ein korrekter Wert angegeben wurde. </Text>
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Name</Text>
        <TextInput
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Name"
          value={name}
          onChangeText={name => setName(name)}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Alter</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Alter"
          value={age}
          onChangeText={age => setAge(age)}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Gewicht</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Gewicht"
          value={weight}
          onChangeText={weight => setWeight(weight)}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Grösse</Text>
        <TextInput
          keyboardType="numeric"
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Grösse"
          value={height}
          onChangeText={height => setHeight(height)}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Geschlecht</Text>
        <View style={{ backgroundColor: theme.colors.secondary, justifyContent: "flex-start", height: 'auto', marginTop: 15 }}>
          <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender} >
            <RadioButton.Item label="Männlich" value="Männlich" />
            <RadioButton.Item label="Weiblich" value="Weiblich" />
          </RadioButton.Group>
        </View>
        <Button mode="outlined" onPress={() => console.log('Pressed')} textColor={theme.colors.secondary} disabled={!isFormValid} style={{
          borderColor: theme.colors.secondary,
          width: 182,
          height: 50,
          marginTop: 50,
          marginBottom: 20
        }}>
          Speichern
        </Button>
        <Button onPress={setupDatabase} textColor={theme.colors.secondary}><Text>Create User!</Text></Button>
        <Button onPress={giveAllUser} textColor={theme.colors.secondary}><Text>Get All User!</Text></Button>
        <Button onPress={deleteAllUsers} textColor={theme.colors.secondary}><Text>Delete All User!</Text></Button>
      </View>
    </ScrollView>
  );
}
