import * as React from 'react';
import { Text, View } from "react-native";
import { createUser, getAllUser } from '../App';
import { Button } from 'react-native-paper';


export default function ProfilScreen() {

  const setupDatabase = async () => {
    createUser('Test', 'Test', 18.9, 189, 16, 'M');
    console.log('UserCreated')
  }

  const giveAllUser = async () => {
    getAllUser();
  }


  return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profil!</Text>
        <Button onPress={setupDatabase}><Text>Create User!</Text></Button>
        <Button onPress={giveAllUser}><Text>Get All User!</Text></Button>
      </View>
  );
  
}



