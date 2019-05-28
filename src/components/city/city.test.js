import React from 'react';
import renderer from 'react-test-renderer';

import Town from './city.jsx';
import apartment from './../../__fixtures__/apartment';

describe(`Town`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<Town
      name={apartment.city.name}
      active={false}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders component correctly with active city`, () => {
    const tree = renderer.
    create(<Town
      name={apartment.city.name}
      active={true}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
