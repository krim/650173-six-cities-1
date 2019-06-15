import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {MemoryRouter as Router} from 'react-router-dom';

import {ApartmentPage} from './apartment-page';
import apartment from '../../__fixtures__/apartment';
import review from '../../__fixtures__/review';
import NameSpace from '../../reducer/name-spaces';
import mapBuilder from '../../mocks/map-builder';

import {Operation} from '../../reducer/data/data';

jest.mock(`../../reducer/data/data`);
Operation.loadReviews = () => (dispatch) => dispatch(jest.fn());

const NAME_SPACE = NameSpace.DATA;
const apartments = [apartment];
const reviews = [{...review, date: 1558416332222}];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {};
initialState[NAME_SPACE] = {
  apartmentId: apartment.id,
  apartments,
  reviews,
  city: apartment.city
};
const store = mockStore(initialState);

describe(`ApartmentPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Provider store={store}>
          <Router>
            <ApartmentPage
              user={{}}
              match={{params: {id: apartment.id.toString()}}}
              apartment={apartment}
              nearApartments={apartments}
              mapSettings={
                {builder: mapBuilder, zoomControl: false, marker: true, location: apartment.city.location}
              }
              isUserAuthorized={true}
            />
          </Router>
        </Provider>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
