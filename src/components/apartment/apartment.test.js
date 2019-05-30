import React from 'react';
import renderer from 'react-test-renderer';

import Apartment from './apartment';
import apartment from './../../__fixtures__/apartment';

describe(`Apartment`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Apartment
        apartment={apartment}
        onClick={() => {}}
        setActive={() => {}}
        disableActive={() => {}}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
