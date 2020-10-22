import React from 'react';
import { render } from '@testing-library/react';
import App from './launches-container';
import LaunchesList from './launches-container';

test('renders launch list component', () => {
  render(<LaunchList />);
});
