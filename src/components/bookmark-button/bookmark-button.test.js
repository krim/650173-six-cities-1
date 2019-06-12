import React from 'react';
import renderer from 'react-test-renderer';

import BookmarkButton from './bookmark-button';

describe(`BookmarkButton`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(
          <BookmarkButton
            className={`property`}
            width={`10`}
            height={`20`}
            onBookmarkClick={jest.fn()}
            isFavorite={true}
          />
      ).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
