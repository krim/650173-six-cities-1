import React from 'react';
import renderer from 'react-test-renderer';

import {Header} from './header.jsx';

describe(`MainPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Header
          user={{}}
          requireAuthorization={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe(`when user is provided`, () => {
    it(`renders component correctly`, () => {
      const user = {id: 1, email: `Oliver.conner@gmail.com`};
      const tree = renderer.create(
          <Header
            user={user}
            requireAuthorization={jest.fn()}
          />
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
