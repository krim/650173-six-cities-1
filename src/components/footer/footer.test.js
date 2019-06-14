import React from 'react';
import renderer from 'react-test-renderer';

import Footer from './footer';

describe(`Footer`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Footer />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
