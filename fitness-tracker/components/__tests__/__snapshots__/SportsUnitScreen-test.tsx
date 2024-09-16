// SportsUnitScreen.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import SportsUnitScreen from '../../SportsUnitScreen';
import { useUser } from '../../UserContext';

jest.useFakeTimers();

jest.mock('../../UserContext', () => ({
  useUser: jest.fn(() => ({
    user: { weight: 70 },
    setCalories: jest.fn(),
  })),
}));

describe('<SportsUnitScreen />', () => {
  it('should match the snapshot', () => {
    const tree = renderer.create(<SportsUnitScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
