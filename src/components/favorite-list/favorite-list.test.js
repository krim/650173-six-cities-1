import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';

import apartment from '../../__fixtures__/apartment';
import user from '../../__fixtures__/user';
import {FavoriteList} from './favorite-list';

jest.mock(`../../hocs/with-favorite/with-favorite`, () => (component) => component);

const favorites = [{city: `Amsterdam`, apartments: [apartment]}];

describe(`FavoriteList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(
          <Router>
            <FavoriteList
              user={user}
              favorites={favorites}
              loadFavorites={jest.fn()}
            />
          </Router>
      ).
      toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe(`when there are no favorite apartments`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(
            <Router>
              <FavoriteList
                user={user}
                favorites={[]}
                loadFavorites={jest.fn()}
              />
            </Router>
        ).
        toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
