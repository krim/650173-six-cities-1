import React from 'react';
import renderer from 'react-test-renderer';

import Review from './review';
import review from './../../__fixtures__/review';

describe(`Review`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Review
        review={review}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
