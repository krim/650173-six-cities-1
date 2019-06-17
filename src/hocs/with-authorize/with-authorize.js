import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import EmailValidator from 'email-validator';

import {Operation} from '../../reducer/user/user';
import {Operation as DataOperation} from '../../reducer/data/data';
import {getError} from '../../reducer/data/selectors';

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
      const {error} = this.props;
      const isSubmitButtonEnabled = email.length > 0 && EmailValidator.validate(email) && password.length > 0;
      // const isSubmitButtonEnabled = true;

      return (
        <WrappedComponent
          {...this.props}
          error={error}
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
      const {authorize, setError} = this.props;

      authorize({email, password})
        .then(() => setError(null))
        .catch((error) => {
          setError(error.response.data.error);
        });
    }

    _handleEmailChange(event) {
      this.setState({email: event.target.value});
    }

    _handlePasswordChange(event) {
      this.setState({password: event.target.value});
    }
  }

  WithAuthorize.propTypes = {
    authorize: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    error: PropTypes.string
  };

  return WithAuthorize;
};

const mapStateToProps = (state) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  authorize: (data) => dispatch(Operation.authorize(data, ownProps)),
  setError: (error) => dispatch(DataOperation.setError(error))
});

const composedWithAuthorize = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withAuthorize
);

export {withAuthorize};
export default composedWithAuthorize;
