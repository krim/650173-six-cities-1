import React from 'react';
import renderer from 'react-test-renderer';

import apartment from '../../__fixtures__/apartment';
import {CityList} from '../../components/city-list/city-list';
import {ApartmentList} from '../../components/apartment-list/apartment-list';
import withActiveItem from './with-active-item';

jest.mock(`../../hocs/with-favorite/with-favorite`, () => (component) => component);

const city = apartment.city;
const cities = [apartment.city];
const apartments = [apartment];

describe(`withActiveItem`, () => {
  describe(`CityList`, () => {
    it(`renders component correctly`, () => {
      const WrappedCityList = withActiveItem(CityList);
      const tree = renderer.create(
          <WrappedCityList
            cities={cities}
            activeItem={city}
            switchCity={jest.fn()}
          />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`ApartmentList`, () => {
    it(`renders component correctly`, () => {
      const WrappedApartmentList = withActiveItem(ApartmentList);
      const tree = renderer.create(
          <WrappedApartmentList
            className={`cities`}
            apartments={apartments}
            activeItem={apartment}
            onBookmarkClick={jest.fn()}
          />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

