import React from 'react';
import renderer from 'react-test-renderer';

import {SortVariants} from './sort-variants';

describe(`SortVariants`, () => {
  describe(`when opened`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(
            <SortVariants
              activeSort={`Popular`}
              onOptionsClick={jest.fn()}
              onOptionClick={jest.fn()}
              opened={true}
            />
        ).
        toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`when closed`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.
        create(
            <SortVariants
              activeSort={`Popular`}
              onOptionsClick={jest.fn()}
              onOptionClick={jest.fn()}
              opened={false}
            />
        ).
        toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
