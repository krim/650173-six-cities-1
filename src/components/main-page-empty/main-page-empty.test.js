import React from 'react';
import renderer from 'react-test-renderer';

import MainPageEmpty from './main-page-empty';

describe(`MainPageEmpty`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<MainPageEmpty />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
