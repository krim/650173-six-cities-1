import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';

import {SignIn} from './sign-in';

describe(`SignIn`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Router>
          <SignIn
            onPasswordChange={jest.fn()}
            onEmailChange={jest.fn()}
            onFormSubmit={jest.fn()}
            isSubmitButtonDisabled={false}
          />
        </Router>
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  describe(`with an error`, () => {
    it(`renders component correctly`, () => {
      const tree = renderer.create(
          <Router>
            <SignIn
              error={`error message`}
              onPasswordChange={jest.fn()}
              onEmailChange={jest.fn()}
              onFormSubmit={jest.fn()}
              isSubmitButtonDisabled={false}
            />
          </Router>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
