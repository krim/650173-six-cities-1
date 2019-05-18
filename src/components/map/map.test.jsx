import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/mapBuilder';

const apartments = [apartment];

describe(`Map`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Map
        apartments={apartments}
        mapBuilder={mapBuilder}
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
