import React from 'react';
import renderer from 'react-test-renderer';

import {SortVariants} from '../../components/sort-variants/sort-variants';
import {withSort} from './with-sort';

describe(`withSort`, () => {
  it(`renders component correctly`, () => {
    const WrappedSortVariants = withSort(SortVariants);
    const tree = renderer.create(
        <WrappedSortVariants
          activeSort={`Popular`}
          switchSort={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

