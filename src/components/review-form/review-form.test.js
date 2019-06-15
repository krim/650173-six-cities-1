import React from 'react';
import renderer from 'react-test-renderer';

import {ReviewForm} from './review-form';

describe(`ReviewForm`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(
          <ReviewForm
            rating={1}
            comment={``}
            onRatingChange={jest.fn()}
            onCommentChange={jest.fn()}
            onFormSubmit={jest.fn()}
            isSubmitButtonDisabled={false}
          />
      ).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
