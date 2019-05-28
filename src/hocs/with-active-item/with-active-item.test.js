import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import CityList from '../../components/city-list/city-list.jsx';
import ApartmentList from '../../components/apartment-list/apartment-list';

const city = apartment.city;
const cities = [apartment.city];
const apartments = [apartment];

describe(`withActiveItem`, () => {
  describe(`CityList`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(<CityList
        cities={cities}
        activeItem={city}
        switchCity={jest.fn()}
      />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`ApartmentList`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(<ApartmentList
        apartments={apartments}
        activeItem={apartment}
      />).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});

