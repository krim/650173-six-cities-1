import React from 'react';
import renderer from 'react-test-renderer';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {MemoryRouter as Router} from 'react-router-dom';

import {App} from './app';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';
import NameSpace from '../../reducer/name-spaces';

const apartments = [apartment];
const city = apartment.city;
const user = {id: 1, email: `Oliver.conner@gmail.com`};
const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
initialState[NameSpace.USER] = {user};
initialState[NameSpace.DATA] = {
  apartments,
  city,
  activeSort: `Popular`
};
const store = mockStore(initialState);

describe(`App`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Router>
          <Provider store={store}>
            <App
              apartments={apartments}
              city={city}
              cities={[city]}
              user={user}
              mapSettings={
                {builder: mapBuilder, zoomControl: false, marker: true}
              }
              loadApartments={jest.fn()}
              switchCity={jest.fn()}
              checkAuthorization={jest.fn()}
            />
          </Provider>
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
