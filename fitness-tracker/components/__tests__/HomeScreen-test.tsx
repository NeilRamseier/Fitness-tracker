import React from 'react';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from '../HomeScreen';
import { UserProvider, useUser } from '../UserContext';
import { changeUserWeight } from '../../App'; // Make sure to import the mocked function

// Mocking the `changeUserWeight` function
jest.mock('../../App', () => ({
  changeUserWeight: jest.fn(),
}));

// Mock the `useUser` hook
jest.mock('../UserContext', () => {
  const actual = jest.requireActual('../UserContext');
  return {
    ...actual,
    useUser: jest.fn(),
  };
});

describe('HomeScreen', () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks();
  });

  it('should increase weight when plus button is pressed', () => {
    const mockSetUser = jest.fn();
    const mockUser = { weight: 70, basal_metabolic_rate: 1500 };

    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
      calories: 200,
      setCalories: jest.fn(),
      basal: 1500,
      setBasal: jest.fn(),
    });

    const { getByTestId } = render(
      <UserProvider>
        <HomeScreen />
      </UserProvider>
    );

    const increaseButton = getByTestId('increase-button');
    
    fireEvent.press(increaseButton);
    
    expect(mockSetUser).toHaveBeenCalledWith({ ...mockUser, weight: 70.1 });
  });

  it('should not decrease weight below 0.1 kg', () => {
    const mockSetUser = jest.fn();
    const mockUser = { weight: 0.1, basal_metabolic_rate: 1500 };

    (useUser as jest.Mock).mockReturnValue({
      user: mockUser,
      setUser: mockSetUser,
      calories: 200,
      setCalories: jest.fn(),
      basal: 1500,
      setBasal: jest.fn(),
    });

    const { getByTestId } = render(
      <UserProvider>
        <HomeScreen />
      </UserProvider>
    );

    const decreaseButton = getByTestId('decrease-button');
    
    fireEvent.press(decreaseButton);
    
    expect(mockSetUser).not.toHaveBeenCalledWith({ ...mockUser, weight: 0.0 });
  });
});


describe('<HomeScreen />', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <UserProvider> {/* Wrappen des HomeScreen mit UserProvider */}
          <HomeScreen />
        </UserProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});