import React from 'react';
import renderer from 'react-test-renderer';

import ErrorPage from './error-page';

describe(`ErrorPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <ErrorPage />
    ).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
