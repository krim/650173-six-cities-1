import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import apartment from '../../__fixtures__/apartment';
import TownList from '../../components/town-list/town-list.jsx';
import ApartmentList from '../../components/apartment-list/apartment-list';

configure({adapter: new Adapter()});

const town = apartment.town;
const town2 = {...town, title: `Paris`};
const towns = [town, town2];

describe(`withActiveItem`, () => {
  describe(`TownList`, () => {
    it(`renders component correctly and handles events`, () => {
      const townList = mount(<TownList towns={towns} activeItem={town} switchTown={jest.fn()}/>);

      expect(townList.state(`activeItem`)).toEqual(town);

      const townItems = townList.find(`a.tabs__item`);
      expect(townItems).toHaveLength(2);

      townItems.last().simulate(`click`);
      expect(townList.state(`activeItem`)).toEqual(town2);
    });
  });

  describe(`ApartmentList`, () => {
    it(`correctly renders after relaunch and handles events`, () => {
      const apartmentList = mount(<ApartmentList apartments={[apartment]}/>);

      const apartmentCard = apartmentList.find(`.cities__place-card`);
      apartmentCard.simulate(`mouseover`);
      expect(apartmentList.state(`activeItem`)).toEqual(apartment);

      apartmentCard.simulate(`mouseout`);
      expect(apartmentList.state(`activeItem`)).toEqual(undefined);
    });
  });
});
