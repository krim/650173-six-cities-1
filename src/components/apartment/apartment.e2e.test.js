import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Apartment from './apartment';
import apartment from './../../__fixtures__/apartment';

configure({adapter: new Adapter()});

describe(`Apartment`, () => {
  it(`correctly renders after relaunch and handles events`, () => {
    const apartmentNameClickHandler = jest.fn();
    const apartmentMouserEnterHandler = jest.fn();
    const apartmentMouserOverHandler = jest.fn();
    const app = shallow(<Apartment
      apartment={apartment}
      apartmentNameClick={apartmentNameClickHandler}
      apartmentMouserEnter={apartmentMouserEnterHandler}
      apartmentMouserOver={apartmentMouserOverHandler}
    />);

    const apartmentName = app.find(`.place-card__name a`);
    apartmentName.simulate(`click`, {preventDefault() {}});
    expect(apartmentNameClickHandler).toHaveBeenCalledTimes(1);

    const apartmentCard = app.find(`.cities__place-card`);

    apartmentCard.simulate(`mouseover`);
    expect(apartmentMouserEnterHandler).toHaveBeenCalledTimes(1);

    apartmentCard.simulate(`mouseout`);
    expect(apartmentMouserOverHandler).toHaveBeenCalledTimes(1);
  });
});
