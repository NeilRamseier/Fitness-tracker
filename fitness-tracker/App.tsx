import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SQLite from 'expo-sqlite';
import * as React from "react";
import { useEffect } from "react";
import { DefaultTheme, PaperProvider } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Double } from "react-native/Libraries/Types/CodegenTypes";
import 'setimmediate';
import CalendarScreen from "./components/CalendarScreen";
import HomeScreen from "./components/HomeScreen";
import ProfileScreen from "./components/ProfileScreen";
import SportsUnitScreen from "./components/SportsUnitScreen";

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
export let currentUser = {
  id: Number,
  first_name: String,
  last_name: String,
  weight: Double,
  height: Number,
  age: Number,
  basal_metabolic_rate: Number,
  gender: String,
  IP: String,
  creation_date: String
}

export let currentEntry = {
  id: Number,
  steps: Number,
  calories: Number,
  time: Number,  
  distance: Number,
  name: String, 
  entry_date: String,  
  user_id: Number,  
}

let IP:any;

async function getPublicIP(): Promise<void> {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    IP = data.ip;
    getUserByIP();
  } catch (error) {
    console.error('Fehler beim Abrufen der IP-Adresse:', error);
  }
}



export async function createUser(first_name: string, last_name: string, weight: Double, height: Number, age:Number, basal_metabolic_rate: Number, gender: String) {
  try {
    const result = await db.runAsync(
      `INSERT INTO users (first_name, last_name, weight, height, age, IP, basal_metabolic_rate, gender)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
      [first_name, last_name, weight, height, age, IP, basal_metabolic_rate, gender]
    );
    console.log('User erfolgreich eingefügt:', result);
  } catch (error) {
    console.error('Fehler beim Einfügen des Users:', error);
  }
  getUser(first_name);

}
export async function getUser(first_name:any) {
  
    const statement = await db.prepareAsync('SELECT * FROM users WHERE first_name = $firstName');
    try {
      const result = await statement.executeAsync<{ first_name: string }>({
        $firstName: first_name,
      });

      const firstRow = await result.getFirstAsync();

      currentUser.first_name = firstRow.first_name;
      currentUser.id = firstRow.id;
      currentUser.gender = firstRow.gender;
      currentUser.height = firstRow.height;
      currentUser.last_name = firstRow.last_name;
      currentUser.weight = firstRow.weight;
      currentUser.age = firstRow.age
      currentUser.basal_metabolic_rate = firstRow.basal_metabolic_rate;
      currentUser.IP = firstRow.IP
      currentUser.creation_date = firstRow.creation_date;

    
      console.log(currentUser);      

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
}

export async function getUserByIP() {
  const statement = await db.prepareAsync('SELECT * FROM users WHERE IP = $IP');

  try {
    const result = await statement.executeAsync<{ IP: string }>({
      $IP: IP,
    });
    console.log(result.getFirstAsync.IP)
    if(result.getFirstAsync === null){
      console.log('There is no user with this ip')
    } else {
      const firstRow = await result.getFirstAsync();

      currentUser.first_name = firstRow.first_name;
      currentUser.id = firstRow.id;
      currentUser.gender = firstRow.gender;
      currentUser.height = firstRow.height;
      currentUser.last_name = firstRow.last_name;
      currentUser.weight = firstRow.weight;
      currentUser.age = firstRow.age
      currentUser.basal_metabolic_rate = firstRow.basal_metabolic_rate;
      currentUser.IP = firstRow.IP
      currentUser.creation_date = firstRow.creation_date;
      console.log(currentUser.first_name);
      if(currentUser.id != null){
        getEntryByUser()
      }
    }
} catch (error) {
  console.error('Fehler beim Abrufen der Benutzer:', error);
  throw error; 
}
}

export async function changeUserWeight(newWeight: Double){
  try {
    await db.runAsync('UPDATE users SET weight = ? WHERE id = ?', [newWeight, currentUser.id]);

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
  getUser(currentUser.first_name);

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
      `DELETE From users;`
    );

    console.log('All User are deleted')

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
}

export async function dropDB() {
  try {
    await db.execAsync(
      `DROP TABLE IF EXISTS users;`
    );

    console.log('Table is deleted')

  } catch (error) {
    console.error('Fehler beim deleten des Tabels:', error);
    throw error; 
  }
}

export async function createDailyEntry(steps: number, calories: number, time: number, distance: number, name: string) {
  try {
    const result = await db.runAsync(
      `INSERT INTO daily_entries (steps, calories, time, distance, name, user_id)
       VALUES (?, ?, ?, ?, ?, ?);`,
      [steps, calories, time, distance, name, currentUser.id]
    );
    console.log('Daily entry erfolgreich eingefügt:', result);
  } catch (error) {
    console.error('Fehler beim Einfügen des daily_entries:', error);
  }
}

export async function getEntryByUser() {
  try {
    const statement = await db.prepareAsync('SELECT * FROM daily_entries WHERE user_id = $user_id');

    const result = await statement.executeAsync({ $user_id: currentUser.id });

    const entry = await result.getFirstAsync();

    if (entry) {
      currentEntry.id = entry.id;
      currentEntry.steps = entry.steps;
      currentEntry.calories = entry.calories;
      currentEntry.distance = entry.distance;
      currentEntry.time = entry.time;
      currentEntry.name = entry.name;
      currentEntry.entry_date = entry.entry_date;
      currentEntry.user_id = entry.user_id;
    
      console.log(currentEntry.steps);
    } else {
      console.log('Kein Eintrag gefunden.');
    }
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzereinträge:', error);
    throw error;
  }
}


export async function getAllEntry() {
  try {
  const statement = await db.getAllAsync('SELECT * FROM daily_entries');

  for (const row of statement) {
    console.log(row.id);
    console.log(currentUser.id);
  }
} catch (error) {
  console.error('Fehler beim Abrufen der Benutzer:', error);
  throw error; 
}
}
export async function deleteAllEntrys() {
  try {
    await db.runAsync(
      `DELETE From daily_entries;`
    );

    console.log('All daily entries are deleted')

  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    throw error; 
  }
}


export default function App() {


  useEffect(() => {
    setupDatabase();
    getPublicIP();
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
    age DECIMAL(3, 0),
    IP VARCHAR(50),
    basal_metabolic_rate DECIMAL(5, 2),
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
            name="SportsUnit"
            component={SportsUnitScreen}
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
              title: "Sporteinheit",
              tabBarIcon: () => (
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
            component={CalendarScreen}
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
            component={ProfileScreen}
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
