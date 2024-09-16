import { render, screen, fireEvent } from '@testing-library/react-native';
import ProfileScreen from '../ProfileScreen';
import { UserProvider, useUser } from '../UserContext';
import * as App from '../../App';
import React from 'react';

jest.useFakeTimers();
jest.mock('../../App', () => ({
  createUser: jest.fn(),
  currentUser: null,
  changeUserWeight: jest.fn(),
  deleteAllUser: jest.fn(),
  dropDB: jest.fn(),
  setErrors: null,
}));


jest.mock('../UserContext', () => {
  const actual = jest.requireActual('../UserContext');
  return {
    ...actual,
    useUser: jest.fn(() => ({
      user: {
        weight: 0,
        age: 0,
        height: 0,
        gender: 'M',
        first_name: '',
        last_name: '',
      },
      setUser: jest.fn(),
      setBasal: jest.fn(),
    })),
  };
});

describe('ProfileScreen', () => {
  const setup = () => {
    render(
      <UserProvider>
        <ProfileScreen />
      </UserProvider>
    );
  };

  test('handles weight change correctly', () => {
    setup();
    fireEvent.changeText(screen.getByPlaceholderText('Gewicht'), '70');
    expect(App.changeUserWeight).toHaveBeenCalledWith(70);
  });

  test('does not save user with invalid fields', async () => {
    setup();

    fireEvent.changeText(screen.getByPlaceholderText('Vorname'), '');
    fireEvent.changeText(screen.getByPlaceholderText('Nachname'), '');
    fireEvent.changeText(screen.getByPlaceholderText('Alter'), '');
    fireEvent.changeText(screen.getByPlaceholderText('Gewicht'), '');
    fireEvent.changeText(screen.getByPlaceholderText('Grösse (cm)'), '');

    fireEvent.press(screen.getByText('Speichern'));

    expect(App.createUser).not.toHaveBeenCalled();
    expect(screen.getByText('Man kann erst speichern, wenn in jedem Feld ein korrekter Wert angegeben wurde.')).toBeTruthy();
  });
});
