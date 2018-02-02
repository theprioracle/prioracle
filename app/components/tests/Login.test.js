// app/components/tests/Login.test.js
// Test basic functionality for our Login component

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

import Login from '../Login';

test('Login renders correctly', () => {
  const tree = renderer.create(<Login />).toJSON();
  expect(tree).toMatchSnapshot();
});
