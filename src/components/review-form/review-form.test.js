import React from 'react';
import renderer from 'react-test-renderer';

import ReviewForm from './review-form';

describe(`ReviewForm`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<ReviewForm />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
