import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SportsUnitScreen from '../SportsUnitScreen';
import { useUser } from '../UserContext';

jest.useFakeTimers();

jest.mock('../UserContext', () => ({
  useUser: jest.fn(() => ({
    user: { weight: 70 },
    setCalories: jest.fn(),
  })),
}));

// Positivtest: Schauen ob alle Texte für die Eingaben auf der Seite angezeigt werden?

describe('<SportsUnitScreen />', () => {
  test('renders correctly', () => {
    const { getByText } = render(<SportsUnitScreen />);

    expect(getByText('Aktivität')).toBeTruthy();
    expect(getByText('Strecke')).toBeTruthy();
    expect(getByText('Dauer')).toBeTruthy();
  });
});

// Negativtest: Schaut das setCalories nicht aufgerufen wird, wenn Input nicht korrekt ist.

describe('<SportsUnitScreen />', () => {
  test('should not calculate calories when input is not valid', () => {
    const mockSetCalories = jest.fn();
    (useUser as jest.Mock).mockReturnValue({
      user: { weight: 70 },
      setCalories: mockSetCalories,
    });

    const { getByPlaceholderText, getByText } = render(<SportsUnitScreen />);

    fireEvent.changeText(getByPlaceholderText('Km'), 'Test');
    fireEvent.changeText(getByPlaceholderText('min'), '20');
    
    fireEvent.press(getByText('Speichern'));


    const expectedCalories = 11.5 * 70 * (20 / 60);

    expect(useUser().setCalories).toHaveBeenCalledWith(expectedCalories);

    expect(mockSetCalories).not.toHaveBeenCalled();

  });
});
