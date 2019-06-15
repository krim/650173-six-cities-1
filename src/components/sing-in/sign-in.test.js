import React from 'react';
import renderer from 'react-test-renderer';

import {SignIn} from './sing-in.jsx';

describe(`SignIn`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <SignIn
          onPasswordChange={jest.fn()}
          onEmailChange={jest.fn()}
          onFormSubmit={jest.fn()}
          isSubmitButtonDisabled={false}
        />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
