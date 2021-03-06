import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from "react-redux";
import configureMockStore from 'redux-mock-store';
import {MemoryRouter as Router} from 'react-router-dom';

import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';
import MainPage from './main-page';
import NameSpace from '../../reducer/name-spaces';

const apartments = [apartment];
const city = apartment.city;

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
initialState[NameSpace.DATA] = {
  activeSort: `Popular`
};
const store = mockStore(initialState);

describe(`MainPage`, () => {
  describe(`without apartments`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <MainPage
                user={{}}
                apartments={apartments}
                activeApartment={{}}
                setApartment={jest.fn()}
                city={city}
                cities={[city]}
                mapSettings={
                  {builder: mapBuilder, zoomControl: false, marker: true}
                }
                switchCity={jest.fn()}
              />
            </Router>
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`without apartments`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Provider store={store}>
            <Router>
              <MainPage
                user={{}}
                apartments={[]}
                activeApartment={{}}
                setApartment={jest.fn()}
                city={city}
                cities={[city]}
                mapSettings={
                  {builder: mapBuilder, zoomControl: false, marker: true}
                }
                switchCity={jest.fn()}
              />
            </Router>
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
