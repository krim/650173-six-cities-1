import React from 'react';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Apartment from './apartment';
import apartment from './../../__fixtures__/apartment';

configure({adapter: new Adapter()});

describe(`Apartment`, () => {
  it(`correctly renders after relaunch and handles events`, () => {
    const onClickHandler = jest.fn();
    const mouseOverHandler = jest.fn();
    const mouseOutHandler = jest.fn();
    const app = shallow(<Apartment
      apartment={apartment}
      onClick={onClickHandler}
      onMouseOver={mouseOverHandler}
      onMouseOut={mouseOutHandler}
    />);

    const apartmentName = app.find(`.place-card__name a`);
    apartmentName.simulate(`click`, {preventDefault() {}});
    expect(onClickHandler).toHaveBeenCalledTimes(1);

    const apartmentCard = app.find(`.cities__place-card`);

    apartmentCard.simulate(`mouseover`);
    expect(mouseOverHandler).toHaveBeenCalledTimes(1);

    apartmentCard.simulate(`mouseout`);
    expect(mouseOutHandler).toHaveBeenCalledTimes(1);
  });
});
