// app/components/tests/ProductAnalysis.test.js
// Test basic functionality for our ProductAnalysis component

import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';

import { configure, shallow, mount, render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from '../../../App';
import ProductAnalysis from '../ProductAnalysis';

configure({ adapter: new Adapter() });

const initialState = {
  listings: []
};

const navigation = {
  state: {
    params: {
      id: 1
    }
  }
};

const mockStore = configureStore();

test('ListingForm renders correctly', () => {
  const wrapper = shallow(
    <ProductAnalysis navigation={navigation} />,
    { context: { store: mockStore(initialState) } },
  );
  expect(wrapper.dive()).toMatchSnapshot();
});
