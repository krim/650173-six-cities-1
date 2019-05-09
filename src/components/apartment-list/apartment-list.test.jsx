import React from 'react';
import renderer from 'react-test-renderer';
import apartment from '../../__fixtures__/apartment';
import ApartmentList from './apartment-list';

const apartments = [apartment];

describe(`ApartmentList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<ApartmentList
      apartments={apartments}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
