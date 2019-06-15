import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import {Provider} from 'react-redux';

import apartment from '../../__fixtures__/apartment';
import {Apartment} from '../../components/apartment/apartment';
import {withFavorite} from './with-favorite';

configure({adapter: new Adapter()});

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {};
const store = mockStore(initialState);

describe(`withFavorite`, () => {
  describe(`when apartment is not favorite`, () => {
    it(`marks it as favorite`, () => {
      const addToFavoritesHandler = jest.fn();
      const WrappedApartment = withFavorite(Apartment);
      const form = mount(
          <Provider store={store}>
            <WrappedApartment
              apartment={apartment}
              setApartment={jest.fn()}
              onImageClick={jest.fn()}
              addToFavorites={addToFavoritesHandler}
              removeFromFavorites={jest.fn()}
              className={`cities`}
            />
          </Provider>
      );

      const bookmarkButton = form.find(`.place-card__bookmark-button`);
      bookmarkButton.simulate(`click`);

      expect(addToFavoritesHandler).toHaveBeenCalledTimes(1);
      expect(addToFavoritesHandler).toHaveBeenNthCalledWith(1, apartment.id);
    });
  });

  describe(`when apartment is favorite`, () => {
    it(`removes it from favorite`, () => {
      const removeFromFavoritesHandler = jest.fn();
      const WrappedApartment = withFavorite(Apartment);
      const form = mount(
          <Provider store={store}>
            <WrappedApartment
              apartment={{...apartment, isFavorite: true}}
              setApartment={jest.fn()}
              onImageClick={jest.fn()}
              addToFavorites={jest.fn()}
              removeFromFavorites={removeFromFavoritesHandler}
              className={`cities`}
            />
          </Provider>
      );

      const bookmarkButton = form.find(`.place-card__bookmark-button`);
      bookmarkButton.simulate(`click`);

      expect(removeFromFavoritesHandler).toHaveBeenCalledTimes(1);
      expect(removeFromFavoritesHandler).toHaveBeenNthCalledWith(1, apartment.id);
    });
  });
});
