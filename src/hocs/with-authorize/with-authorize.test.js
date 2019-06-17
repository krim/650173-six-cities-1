import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';

import {SignIn} from '../../components/sign-in/sign-in';
import {withAuthorize} from './with-authorize';

describe(`withAuthorize`, () => {
  it(`renders component correctly`, () => {
    const WrappedSignIn = withAuthorize(SignIn);
    const tree = renderer.create(
        <Router>
          <WrappedSignIn
            authorize={jest.fn()}
            setError={jest.fn()}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

