import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
import * as React from "react";
import { useEffect } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import 'setimmediate';
import HomeScreen from "./components/HomeScreen";
import KalenderScreen from "./components/KalenderScreen";
import ProfilScreen from "./components/ProfilScreen";
import SporteinheitScreen from "./components/SporteinheitScreen";

const Tab = createBottomTabNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#1A5A41",
    secondary: "#EAE7E7",
  },
};

let db: any;

export async function createUser(first_name: string, last_name: string, weight: Double, height: Number, basal_metabolic_rate: Number, gender: String) {
  try {
    const result = await db.runAsync(
      `INSERT INTO users (first_name, last_name, weight, height, basal_metabolic_rate, gender)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [first_name, last_name, weight, height, basal_metabolic_rate, gender]
    );
    console.log('User erfolgreich eingefügt:', result);
  } catch (error) {
    console.error('Fehler beim Einfügen des Users:', error);
  }
}

export async function getAllUser() {
  try {
    const result = await db.getAllAsync(
      `SELECT * FROM users;`
    );
    for (const row of result) {
      console.log(row.id, row.first_name);
    }

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
}

export async function deleteAllUser() {
  try {
    await db.runAsync(
      `DELETE * From users;`
    );

    console.log('All User are deleted')

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
}

export default function App() {


  useEffect(() => {
    setupDatabase();
  }, []);

  const setupDatabase = async () => {
    db = await SQLite.openDatabaseAsync("FitnessData");
    try{
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY NOT NULL,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    weight DECIMAL(5, 2),  
    height DECIMAL(4, 1),  
basal_metabolic_rate DECIMAL(6, 2),
 gender CHAR(1) CHECK(gender IN ('M', 'F', 'O')) DEFAULT 'O',  
    creation_date DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS daily_entries (
    id INTEGER PRIMARY KEY NOT NULL,
    steps INTEGER,  
    calories DECIMAL(6, 2),  
    time DECIMAL(5, 2),  
    distance DECIMAL(5, 2),  
    name VARCHAR(50), 
    entry_date DATE DEFAULT CURRENT_DATE,  
    user_id INTEGER,  
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

    
      `)
      console.log(db)
    }catch (error) {
      console.error("Error setting up database:", error);
    }
  }
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: () => (
                <MaterialCommunityIcons
                  name="home"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Sporteinheit"
            component={SporteinheitScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="plus-circle"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Kalender"
            component={KalenderScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="calendar"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profil"
            component={ProfilScreen}
            options={{
              tabBarStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerStyle: {
                backgroundColor: theme.colors.primary,
              },
              headerTitleStyle: {
                color: theme.colors.secondary,
              },
              tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons
                  name="account"
                  color={theme.colors.secondary}
                  size={28}
                />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
