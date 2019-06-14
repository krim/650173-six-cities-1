import React from 'react';
import renderer from 'react-test-renderer';

import Map from './map';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';

const apartments = [apartment];
const mapSettings = {
  builder: mapBuilder,
  location: {latitude: 52.38333, longitude: 4.9, zoom: 12},
  zoomControl: false,
  marker: true
};

describe(`Map`, () => {
  describe(`without active apartment`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(<Map
          apartments={apartments}
          activeApartment={{}}
          mapSettings={mapSettings}
          pageType={`cities`}
        />).
        toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`with active apartment`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(<Map
          apartments={apartments}
          activeApartment={apartment}
          mapSettings={mapSettings}
          pageType={`cities`}
        />).
        toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
