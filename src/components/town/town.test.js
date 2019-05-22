import React from 'react';
import renderer from 'react-test-renderer';

import Town from './Town';
import apartment from './../../__fixtures__/apartment';

describe(`Town`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
    create(<Town
      town={apartment.town}
      active={false}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`renders component correctly with active town`, () => {
    const tree = renderer.
    create(<Town
      town={apartment.town}
      active={true}
      onClick={jest.fn()}
    />).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
