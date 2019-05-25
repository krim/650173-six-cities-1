import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ApartmentList from './apartment-list';
import apartment from './../../__fixtures__/apartment';

configure({adapter: new Adapter()});

describe(`ApartmentList`, () => {
  it(`correctly renders after relaunch and updates state`, () => {
    const apartmentList = mount(<ApartmentList
      apartments={[apartment]}
    />);

    const apartmentCard = apartmentList.find(`.cities__place-card`);
    apartmentCard.simulate(`mouseover`);
    expect(apartmentList.state(`activeItem`)).toEqual(apartment);

    apartmentCard.simulate(`mouseout`);
    expect(apartmentList.state(`activeItem`)).toEqual(undefined);
  });
});
