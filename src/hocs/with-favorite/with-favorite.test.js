import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import apartment from '../../__fixtures__/apartment';
import ApartmentList from '../../components/apartment-list/apartment-list';

const apartments = [apartment];
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe(`withFavorite`, () => {
  describe(`ApartmentList`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <ApartmentList apartments={apartments} />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

