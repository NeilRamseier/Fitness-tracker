// src/database/database.tsx
import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase(
  {
    name: 'mydatabase.db',
    location: 'default',
  },
  () => {
    console.log('Datenbank erfolgreich geöffnet');
  },
  error => {
    console.error('Fehler beim Öffnen der Datenbank: ', error);
  }
);

export const createUserTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstname TEXT,
        lastname TEXT,
        weight REAL,
        height REAL,
        basalMetabolism REAL,
        gender TEXT
      )`,
      [],
      () => {
        console.log('Tabelle "users" erfolgreich erstellt');
      },
      error => {
        console.log('Fehler beim Erstellen der "users"-Tabelle: ', error);
      }
    );
  });
};

export const createDailyEntriesTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS daily_entries (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        userId INTEGER,
        steps INTEGER,
        calories REAL,
        time REAL,
        distance REAL,
        name TEXT,
        date TEXT,
        FOREIGN KEY (userId) REFERENCES users(id)
      )`,
      [],
      () => {
        console.log('Tabelle "daily_entries" erfolgreich erstellt');
      },
      error => {
        console.log('Fehler beim Erstellen der "daily_entries"-Tabelle: ', error);
      }
    );
  });
};

export const insertUser = (
  firstname: string,
  lastname: string,
  weight: number,
  height: number,
  basalMetabolism: number,
  gender: string
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO users (firstname, lastname, weight, height, basalMetabolism, gender) VALUES (?, ?, ?, ?, ?, ?)',
      [firstname, lastname, weight, height, basalMetabolism, gender],
      (tx, result) => {
        console.log('Benutzer erfolgreich eingefügt');
      },
      error => {
        console.log('Fehler beim Einfügen des Benutzers: ', error);
      }
    );
  });
};

export const insertDailyEntry = (
  userId: number,
  steps: number,
  calories: number,
  time: number,
  distance: number,
  name: string,
  date: string
) => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO daily_entries (userId, steps, calories, time, distance, name, date) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, steps, calories, time, distance, name, date],
      (tx, result) => {
        console.log('Tageseintrag erfolgreich eingefügt');
      },
      error => {
        console.log('Fehler beim Einfügen des Tageseintrags: ', error);
      }
    );
  });
};
