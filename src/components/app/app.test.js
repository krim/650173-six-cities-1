import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import {App} from './app';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/mapBuilder';

const apartments = [apartment];
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {
  apartments,
  town: apartment.town
};
const store = mockStore(initialState);

describe(`App`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <App
            apartments={apartments}
            town={apartment.town}
            mapSettings={
              {builder: mapBuilder, zoom: 12, coordinates: [52.38333, 4.9], zoomControl: false, marker: true}
            }
            loadApartments={jest.fn()}
            switchTown={jest.fn()}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
