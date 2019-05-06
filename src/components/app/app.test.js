import React from 'react';
import renderer from 'react-test-renderer';
import App from './app';

describe(`App`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<App
        apartments={[{name: `apartment name`}]}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
