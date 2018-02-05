// app/components/tests/ListingForm.test.js
// Test basic functionality for our ListingForm component

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../../App';
import ListingForm from '../ListingForm';

configure({ adapter: new Adapter() });

const initialState = {};

const mockStore = configureStore();

test('ListingForm renders correctly', () => {
  const wrapper = shallow(
    <ListingForm />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
