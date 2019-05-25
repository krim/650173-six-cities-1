import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import {TownList} from './town-list';

const towns = [apartment.town];

describe(`TownList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<TownList
      towns={towns}
      activeItem={apartment.town}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
