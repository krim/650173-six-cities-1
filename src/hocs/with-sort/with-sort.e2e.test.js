import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SortVariants} from '../../components/sort-variants/sort-variants';
import {withSort} from './with-sort';

configure({adapter: new Adapter()});

describe(`withSort`, () => {
  it(`changes the state and submit form`, () => {
    const sortHandler = jest.fn();
    const WrappedSortVariants = withSort(SortVariants);
    const form = mount(
        <WrappedSortVariants
          activeSort={`Popular`}
          switchSort={sortHandler}
        />
    );

    expect(form.state(`opened`)).toEqual(false);

    const sortLabel = form.find(`.places__sorting-type`);
    sortLabel.simulate(`click`);
    expect(form.state(`opened`)).toEqual(true);

    const lastSortType = `Top rated first`;
    const topRatedSort = form.find(`li.places__option`).last();
    topRatedSort.simulate(`click`);
    expect(sortHandler).toHaveBeenCalledTimes(1);
    expect(sortHandler).toHaveBeenNthCalledWith(1, lastSortType);
  });
});

