import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sing-in.jsx';

describe(`SignIn`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <SignIn
          authorize={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
