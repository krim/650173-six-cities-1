import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';

import FavoriteEmptyList from './favorite-empty-list';
import user from '../../__fixtures__/user';

describe(`FavoriteEmptyList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(
          <Router>
            <FavoriteEmptyList user={user} />
          </Router>
      ).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
