import React from 'react';
import renderer from 'react-test-renderer';

import apartment from '../../__fixtures__/apartment';
import mapBuilder from '../../mocks/map-builder';
import MainPage from './main-page.jsx';

const apartments = [apartment];
const city = apartment.city;

describe(`MainPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <MainPage
          apartments={apartments}
          city={city}
          cities={[city]}
          mapSettings={
            {builder: mapBuilder, zoomControl: false, marker: true}
          }
          switchCity={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
