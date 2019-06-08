import React from 'react';
import renderer from 'react-test-renderer';

import {ApartmentPage} from './apartment-page';
import apartment from '../../__fixtures__/apartment';

const apartments = [apartment];

describe(`ApartmentPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <ApartmentPage
          match={{params: {id: apartment.id.toString()}}}
          apartment={apartment}
          nearApartments={apartments}
          setApartmentId={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
