import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/user/user';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.state = {
      email: ``,
      password: ``
    };
  }

  handleFormSubmit(event) {
    event.preventDefault();
    const {email, password} = this.state;

    this.props.authorize({email, password});
  }

  handleEmailChange(event) {
    this.setState({email: event.target.value});
  }

  handlePasswordChange(event) {
    this.setState({password: event.target.value});
  }

  render() {
    const {email, password} = this.state;
    const isSubmitButtonEnabled = email.length > 0 && password.length > 0;

    return (
      <React.Fragment>
        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form className="login__form form" onSubmit={this.handleFormSubmit} method="post">
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    className="login__input form__input"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.email}
                    required=""
                    onChange={this.handleEmailChange}
                  />
                </div>
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">Password</label>
                  <input
                    className="login__input form__input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={this.password}
                    required=""
                    onChange={this.handlePasswordChange}
                  />
                </div>
                <button
                  className='login__submit form__submit button'
                  disabled={!isSubmitButtonEnabled}
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
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  authorize: PropTypes.func.isRequired
};

export {SignIn};

const mapDispatchToProps = (dispatch, ownProps) => ({
  authorize: (data) => dispatch(Operation.authorize(data, ownProps))
});

export default connect(null, mapDispatchToProps)(SignIn);
