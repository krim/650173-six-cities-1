import React from 'react';
import renderer from 'react-test-renderer';

import ReviewList from './review-list';

describe(`ReviewList`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <ReviewList />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
