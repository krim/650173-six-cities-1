import React from 'react';
import renderer from 'react-test-renderer';

import {Apartment} from './apartment';
import apartment from './../../__fixtures__/apartment';

describe(`Apartment`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Apartment
        className={`cities`}
        apartment={apartment}
        onClick={jest.fn()}
        onImageClick={jest.fn()}
        onBookmarkClick={jest.fn()}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
