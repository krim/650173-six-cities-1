import React from 'react';
import renderer from 'react-test-renderer';

import Error from './error';

describe(`Error`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Error message={`text`}/>).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
