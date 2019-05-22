import React from 'react';
import renderer from 'react-test-renderer';

import {App} from './app';
import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/mapBuilder';

const apartments = [apartment];

describe(`App`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.
      create(<App
        apartments={apartments}
        mapSettings={
          {builder: mapBuilder, zoom: 12, coordinates: [52.38333, 4.9], zoomControl: false, marker: true}
        }
        town={apartment.town}
        loadApartments={jest.fn()}
        switchTown={jest.fn()}
      />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
