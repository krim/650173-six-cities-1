import React from 'react';
import PropTypes from 'prop-types';

import withAuthorize from '../../hocs/with-authorize/with-authorize';
import Header from '../header/header.jsx';
import Error from '../error/error.jsx';

const SignIn = (props) => {
  const {
    error,
    onPasswordChange,
    onEmailChange,
    onFormSubmit,
    isSubmitButtonDisabled
  } = props;

  return (
    <div className="page page--gray page--login">
      <Header user={{}}/>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form className="login__form form" onSubmit={onFormSubmit} method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required=""
                  onChange={onEmailChange}
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required=""
                  onChange={onPasswordChange}
                />
              </div>
              { error && <Error message={error} />}
              <button
                className='login__submit form__submit button'
                disabled={isSubmitButtonDisabled}
                type="submit"
              >Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SignIn.propTypes = {
  error: PropTypes.string,
  onPasswordChange: PropTypes.func.isRequired,
  onEmailChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isSubmitButtonDisabled: PropTypes.bool.isRequired
};

export {SignIn};
export default withAuthorize(SignIn);
