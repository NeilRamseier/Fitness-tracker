import React, { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { Button, RadioButton, TextInput, useTheme } from "react-native-paper";
import { createUser, deleteAllUser, getAllUser, dropDB, currentUser, changeUserWeight } from '../App';

export default function ProfileScreen() {

  const setupDatabase = async () => {
    console.log('UserCreated')
  }

  const giveAllUser = async () => {
    getAllUser();
  }

  const deleteAllUsers = async () => {
    deleteAllUser();
  }

  const changeWeight = async () => {
    changeUserWeight(39.5)
  }

  const currentUsere = async () => {
    console.log(currentUser.IP);
  }


  const dropDatabase = async () => {
    dropDB();
  }
  const theme = useTheme();
  const [firstName, setFirstName] = React.useState(currentUser.first_name ? currentUser.first_name : "");
  const [lastName, setLastName] = React.useState(currentUser.last_name ? currentUser.last_name : "");
  const [age, setAge] = React.useState(Number.isNaN(currentUser.age) ? currentUser.age : 0);
  const [weight, setWeight] = React.useState(Number.isNaN(currentUser.weight) ? currentUser.weight : 0);
  const [height, setHeight] = React.useState(Number.isNaN(currentUser.height) ? currentUser.height : 0);
  const [gender, setGender] = React.useState(currentUser.gender ? currentUser.gender : "");
  const [isFormValid, setIsFormValid] = React.useState(false);
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    age: '',
    weight: '',
    height: '',
    gender: ''
  });
  useEffect(() => {
    validateForm();
  }, [firstName, lastName, age, weight, height, gender]);

  const validateForm = () => {
    let errors = { firstName: '', lastName: '', age: '', weight: '', height: '', gender: '' };

    if (!firstName) {
      errors.firstName = 'Vorname ist notwendig.';
    }
    if (!lastName) {
      errors.firstName = 'Nachname ist notwendig.';
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

  const calculateBasal = (gender: string, weight: number, age: number, height: number) => {
    if (gender == "M") {
      return Math.round(66.47 + (13.7 * weight) + (5 * height) - (6.8 * age));
    }
    return Math.round(655.1 + (9.6 * weight) + (1.8 * height) - (4.7 * age));
  }

  return (
    <ScrollView bounces={false} >
      <View style={{ backgroundColor: theme.colors.primary, flex: 1, justifyContent: "center", alignItems: "center" }}>
        {!isFormValid && (
          <Text style={{ color: 'red', margin: 15 }} >Man kann erst speichern, wenn in jedem Feld ein korrekter Wert angegeben wurde. </Text>
        )}
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Vorname</Text>
        <TextInput
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Vorname"
          value={firstName}
          onChangeText={firstName => setFirstName(firstName)}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Nachname</Text>
        <TextInput
          style={{
            marginTop: 15,
            width: 182,
            height: 50
          }}
          placeholder="Nachname"
          value={lastName}
          onChangeText={lastName => setLastName(lastName)}
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
          value={age ? age.toString() : ""}
          onChangeText={age => setAge(parseInt(age))}
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
          placeholder="Grösse (cm)"
          value={height ? height.toString() : ""}
          onChangeText={height => setHeight(parseInt(height))}
        />
        <Text style={{ color: theme.colors.secondary, fontSize: 25, marginTop: 30 }}>Geschlecht</Text>
        <View style={{ backgroundColor: theme.colors.secondary, justifyContent: "flex-start", height: 'auto', marginTop: 15 }}>
          <RadioButton.Group onValueChange={gender => setGender(gender)} value={gender} >
            <RadioButton.Item label="Männlich" value="M" />
            <RadioButton.Item label="Weiblich" value="F" />
          </RadioButton.Group>
        </View>
        <Button mode="outlined"  onPress={async () => createUser(firstName, lastName, parseFloat(weight), height, age, await calculateBasal(gender, parseFloat(weight), age, height), gender)} textColor={theme.colors.secondary} disabled={!isFormValid} style={{
          borderColor: theme.colors.secondary,
          width: 182,
          height: 50,
          marginTop: 50,
          marginBottom: 20
        }}>
          Speichern
        </Button>
        <Button onPress={deleteAllUsers} textColor={theme.colors.secondary}><Text>Delete All User!</Text></Button>
        <Button onPress={dropDatabase} textColor={theme.colors.secondary}><Text>Drop DB!</Text></Button>
        <Button onPress={currentUsere} textColor={theme.colors.secondary}><Text>look at currentUser</Text></Button>
        <Button onPress={changeWeight} textColor={theme.colors.secondary}><Text>changeWeight</Text></Button>
      </View>
    </ScrollView>
  );
}
