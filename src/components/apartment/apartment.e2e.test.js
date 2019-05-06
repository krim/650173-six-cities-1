import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Apartment from './apartment';

Enzyme.configure({adapter: new Adapter()});

describe(`Apartment`, () => {
  it(`App correctly renders after relaunch`, () => {
    const apartmentNameClickHandler = jest.fn();
    const app = shallow(<Apartment
      apartment={{name: `apartment name`}}
      apartmentNameClick={apartmentNameClickHandler}
    />);
    const apartmentName = app.find(`.place-card__name a`);

    apartmentName.simulate(`click`, {preventDefault() {}});
    expect(apartmentNameClickHandler).toHaveBeenCalledTimes(1);
  });
});
