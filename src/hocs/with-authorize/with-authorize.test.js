import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from '../../components/sing-in/sing-in';
import {withAuthorize} from './with-authorize';

describe(`withAuthorize`, () => {
  it(`renders component correctly`, () => {
    const WrappedSignIn = withAuthorize(SignIn);
    const tree = renderer.create(
        <WrappedSignIn
          authorize={jest.fn()}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

