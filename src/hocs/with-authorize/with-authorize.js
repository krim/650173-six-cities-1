import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EmailValidator from 'email-validator';

import {Operation} from '../../reducer/user/user';

const withAuthorize = (WrappedComponent) => {
  class WithAuthorize extends PureComponent {
    constructor(props) {
      super(props);

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleEmailChange = this._handleEmailChange.bind(this);
      this._handlePasswordChange = this._handlePasswordChange.bind(this);

      this.state = {
        email: ``,
        password: ``
      };
    }

    render() {
      const {email, password} = this.state;
      const isSubmitButtonEnabled = email.length > 0 && EmailValidator.validate(email) && password.length > 0;

      return (
        <WrappedComponent
          {...this.props}
          isSubmitButtonDisabled={!isSubmitButtonEnabled}
          onFormSubmit={this._handleFormSubmit}
          onEmailChange={this._handleEmailChange}
          onPasswordChange={this._handlePasswordChange}
        />
      );
    }

    _handleFormSubmit(event) {
      event.preventDefault();
      const {email, password} = this.state;

      this.props.authorize({email, password});
    }

    _handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    _handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }
  }

  WithAuthorize.propTypes = {
    authorize: PropTypes.func.isRequired
  };

  return WithAuthorize;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  authorize: (data) => dispatch(Operation.authorize(data, ownProps))
});

const composedWithAuthorize = compose(
    connect(null, mapDispatchToProps),
    withAuthorize
);

export {withAuthorize};
export default composedWithAuthorize;
