import React from 'react';
import renderer from 'react-test-renderer';
import Apartment from './apartment';

describe(`Apartment`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Apartment
        apartment={{name: `apartment name`}}
        apartmentNameClick={() => {}}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
