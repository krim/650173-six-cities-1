import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import TownList from '../../components/town-list/town-list.jsx';
import ApartmentList from '../../components/apartment-list/apartment-list';

const town = apartment.town;
const towns = [apartment.town];
const apartments = [apartment];

describe(`withActiveItem`, () => {
  describe(`TownList`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(<TownList
        towns={towns}
        activeItem={town}
        switchTown={jest.fn()}
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
