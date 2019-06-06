import React from 'react';
import renderer from 'react-test-renderer';

import apartment from '../../__fixtures__/apartment';
import {FavoriteList} from './favorite-list';

const favorites = [{city: `Amsterdam`, apartments: [apartment]}];

describe(`FavoriteList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<FavoriteList
        favorites={favorites}
        loadFavorites={jest.fn()}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe(`when there are no favorites apartments`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(<FavoriteList
          favorites={[]}
          loadFavorites={jest.fn()}
        />).
        toJSON();

      expect(tree).toMatchSnapshot();
    });


  });
});
