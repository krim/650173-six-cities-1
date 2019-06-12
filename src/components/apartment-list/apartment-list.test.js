import React from 'react';
import renderer from 'react-test-renderer';

import apartment from '../../__fixtures__/apartment';
import {ApartmentList} from './apartment-list';

jest.mock(`../../hocs/with-favorite/with-favorite`, () => (component) => component);

const apartments = [apartment];

describe(`ApartmentList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<ApartmentList
        apartments={apartments}
        setActive={jest.fn()}
        onMouseOver={jest.fn()}
        onMouseOut={jest.fn()}
        onBookmarkClick={jest.fn()}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
