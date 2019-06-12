import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';

import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';
import MainPage from './main-page.jsx';

const apartments = [apartment];
const city = apartment.city;

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe(`MainPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <MainPage
            apartments={apartments}
            city={city}
            cities={[city]}
            mapSettings={
              {builder: mapBuilder, zoomControl: false, marker: true}
            }
            switchCity={jest.fn()}
          />
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
