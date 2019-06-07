import React from 'react';
import renderer from 'react-test-renderer';

import FavoriteEmptyList from './favorite-empty-list';

describe(`FavoriteEmptyList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<FavoriteEmptyList />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
