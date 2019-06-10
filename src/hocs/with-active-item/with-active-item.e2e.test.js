import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import apartment from '../../__fixtures__/apartment';
import CityList from '../../components/city-list/city-list.jsx';
import ApartmentList from '../../components/apartment-list/apartment-list';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';

configure({adapter: new Adapter()});

const city = apartment.city;
const city2 = {...city, name: `Paris`};
const cities = [city, city2];

const middlewares = [];
const mockStore = configureMockStore(middlewares);
const initialState = {
  apartments: [apartment]
};
const store = mockStore(initialState);

describe(`withActiveItem`, () => {
  describe(`CityList`, () => {
    it(`renders component correctly and handles events`, () => {
      const cityList = mount(<CityList cities={cities} activeItem={city} switchCity={jest.fn()}/>);

      expect(cityList.state(`activeItem`)).toEqual(city);

      const cityItems = cityList.find(`a.tabs__item`);
      expect(cityItems).toHaveLength(2);

      cityItems.last().simulate(`click`);
      expect(cityList.state(`activeItem`)).toEqual(city2);
    });
  });

  describe(`ApartmentList`, () => {
    it(`correctly renders after relaunch and handles events`, () => {
      const apartmentList = mount(
          <Provider store={store}>
            <ApartmentList apartments={[apartment]}/>
          </Provider>
      );

      const apartmentCard = apartmentList.find(`.cities__place-card`);
      apartmentCard.simulate(`mouseover`);
      expect(apartmentList.state(`activeItem`)).toEqual(apartment);

      apartmentCard.simulate(`mouseout`);
      expect(apartmentList.state(`activeItem`)).toEqual(undefined);
    });
  });
});
