import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import apartment from '../../__fixtures__/apartment';
import Apartment from '../../components/apartment/apartment';

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe(`withFavorite`, () => {
  describe(`Apartment`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Apartment
              apartment={apartment}
              setApartment={jest.fn()}
              onImageClick={jest.fn()}
              className={`cities`}
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

