import React, { useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { TextInput, useTheme, Button, RadioButton } from "react-native-paper";

export default function ProfilScreen() {
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
    <ScrollView>
      <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
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
      </View>
    </ScrollView>
  );
}
