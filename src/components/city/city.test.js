import React from 'react';
import renderer from 'react-test-renderer';

import City from './city.jsx';
import apartment from './../../__fixtures__/apartment';

describe(`City`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<City
      name={apartment.city.name}
      active={false}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders component correctly with active city`, () => {
    const tree = renderer.
    create(<City
      name={apartment.city.name}
      active={true}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
