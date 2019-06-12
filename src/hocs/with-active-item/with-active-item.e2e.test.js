import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import apartment from '../../__fixtures__/apartment';
import {CityList} from '../../components/city-list/city-list';
import {ApartmentList} from '../../components/apartment-list/apartment-list';
import withActiveItem from './with-active-item';

jest.mock(`../../hocs/with-favorite/with-favorite`, () => (component) => component);

configure({adapter: new Adapter()});

describe(`withActiveItem`, () => {
  describe(`CityList`, () => {
    it(`renders component correctly and handles events`, () => {
      const city = apartment.city;
      const city2 = {...city, name: `Paris`};
      const cities = [city, city2];
      const WrappedCityList = withActiveItem(CityList);

      const cityList = mount(<WrappedCityList cities={cities} activeItem={city} switchCity={jest.fn()}/>);

      expect(cityList.state(`activeItem`)).toEqual(city);

      const cityItems = cityList.find(`a.tabs__item`);
      expect(cityItems).toHaveLength(2);

      cityItems.last().simulate(`click`);
      expect(cityList.state(`activeItem`)).toEqual(city2);
    });
  });

  describe(`ApartmentList`, () => {
    it(`correctly renders after relaunch and handles events`, () => {
      const WrappedApartmentList = withActiveItem(ApartmentList);
      const apartmentList = mount(<WrappedApartmentList apartments={[apartment]} onBookmarkClick={jest.fn()}/>);

      const apartmentCard = apartmentList.find(`.cities__place-card`);
      apartmentCard.simulate(`mouseover`);
      expect(apartmentList.state(`activeItem`)).toEqual(apartment);

      apartmentCard.simulate(`mouseout`);
      expect(apartmentList.state(`activeItem`)).toEqual(undefined);
    });
  });
});
