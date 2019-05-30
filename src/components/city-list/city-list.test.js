import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import {CityList} from './city-list';

const cities = [apartment.city];

describe(`CityList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<CityList
      cities={cities}
      activeItem={apartment.city}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
