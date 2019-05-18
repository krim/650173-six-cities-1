import React from 'react';
import renderer from 'react-test-renderer';

import App from './app';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/mapBuilder';

const apartments = [apartment];

describe(`App`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<App
        apartments={apartments}
        mapBuilder={mapBuilder}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
