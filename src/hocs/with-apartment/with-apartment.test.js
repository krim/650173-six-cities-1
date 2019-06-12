import React from 'react';
import renderer from 'react-test-renderer';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import apartment from '../../__fixtures__/apartment';
import {ApartmentPageWithState} from '../../components/apartment-page/apartment-page';
import withApartment from '../with-apartment/with-apartment';
import NameSpace from '../../reducer/name-spaces';
import mapBuilder from '../../mocks/map-builder';
import {Operation} from '../../reducer/data/data';

jest.mock(`../../reducer/data/data`);
Operation.loadReviews = () => (dispatch) => dispatch(jest.fn());

const NAME_SPACE = NameSpace.DATA;

const apartments = [apartment];
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const initialState = {};
initialState[NAME_SPACE] = {
  apartments,
  city: apartment.city,
  reviews: []
};
const store = mockStore(initialState);

describe(`withApartment`, () => {
  describe(`ApartmentPage`, () => {
    it(`renders component correctly`, () => {
      const WrappedApartmentPage = withApartment(ApartmentPageWithState);
      const tree = renderer.create(
          <Provider store={store}>
            <WrappedApartmentPage
              match={{params: {id: apartment.id.toString()}}}
              mapSettings={
                {builder: mapBuilder, zoomControl: false, marker: true}
              }
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

