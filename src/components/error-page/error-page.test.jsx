import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter as Router} from 'react-router-dom';

import ErrorPage from './error-page';

describe(`ErrorPage`, () => {
  it(`renders component correctly`, () => {
    const tree = renderer.create(
        <Router>
          <ErrorPage />
        </Router>
    ).
    toJSON();

    expect(tree).toMatchSnapshot();
  });
});
