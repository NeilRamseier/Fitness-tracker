import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SportsUnitScreen from '../SportsUnitScreen';
import { useUser } from '../UserContext';
import { currentUser } from '../../App';

jest.mock('./UserContext', () => ({
  useUser: jest.fn()
}));

 

describe('<SportsUnitScreen />', () => {
    test('should correctly calculate calories for 5km in 20min while jogging', () => {
        const mockUser = { weight: 70 };
      const mockSetCalories = jest.fn();
      (useUser as jest.Mock).mockImplementation(() => ({
        user: mockUser,
        setCalories: mockSetCalories,
      }));

    const { getByPlaceholderText, getByText, getByLabelText } = render(<SportsUnitScreen />);
    fireEvent.press(getByLabelText('Joggen'));
    fireEvent.changeText(getByPlaceholderText('Km'), '5');
    fireEvent.changeText(getByPlaceholderText('min'), '20');
    fireEvent.press(getByText('Speichern'));

    const expectedCalories = 11.5 * 70 * (20 / 60);

    expect(useUser().setCalories).toHaveBeenCalledWith(expectedCalories);
  });
});
