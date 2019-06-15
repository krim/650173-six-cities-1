import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {SignIn} from '../../components/sing-in/sing-in';
import {withAuthorize} from './with-authorize';

configure({adapter: new Adapter()});

describe(`withAuthorize`, () => {
  it(`changes the state and submit form`, () => {
    const authorizeHandler = jest.fn();
    const WrappedSignIn = withAuthorize(SignIn);
    const form = mount(
        <WrappedSignIn
          authorize={authorizeHandler}
        />
    );

    const submitButton = form.find(`.login__submit`);
    expect(submitButton.props().disabled).toEqual(true);

    expect(form.state(`email`)).toEqual(``);
    expect(form.state(`password`)).toEqual(``);

    const email = `admin@example.com`;
    const emailField = form.find(`input.login__input`).first();
    emailField.instance().value = email;
    emailField.simulate(`change`);
    expect(form.state(`email`)).toEqual(email);


    const password = `password`;
    const passwordField = form.find(`input.login__input`).last();
    passwordField.instance().value = password;
    passwordField.simulate(`change`);
    expect(form.state(`password`)).toEqual(password);

    const updatedSubmitButton = form.find(`.login__submit`);
    expect(updatedSubmitButton.props().disabled).toEqual(false);

    const authorizeForm = form.find(`form.login__form`);
    authorizeForm.simulate(`submit`);
    expect(authorizeHandler).toHaveBeenCalledTimes(1);
    expect(authorizeHandler).toHaveBeenNthCalledWith(1, {email, password});
  });
});

