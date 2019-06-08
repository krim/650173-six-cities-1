import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';

const apartments = [apartment];

describe(`Map`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<Map
        apartments={apartments}
        mapSettings={
          {
            builder: mapBuilder,
            location: {latitude: 52.38333, longitude: 4.9, zoom: 12},
            zoomControl: false,
            marker: true
          }
        }
      />).
      toJSON();

    expect(tree).toMatchSnapshot();
  });
});
