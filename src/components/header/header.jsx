import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Operation} from '../../reducer/user/user';
import {connect} from 'react-redux';

class Header extends PureComponent {
  render() {
    const {user, requireAuthorization} = this.props;

    return (
      <React.Fragment>
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41"/>
                </a>
              </div>

              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      {
                        Object.keys(user).length > 0 ?
                          <span className="header__user-name user__name">{user.email}</span> :
                          <span className="header__login" onClick={requireAuthorization}>Sign in</span>
                      }
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>
      </React.Fragment>
    );
  }
}

export {Header};

Header.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    avatarUrl: PropTypes.string,
    isPro: PropTypes.bool
  }),
  requireAuthorization: PropTypes.func.isRequired
};

const mapStateToProps = () => {
  return {};
};
const mapDispatchToProps = (dispatch) => ({
  requireAuthorization: () => dispatch(Operation.requireAuthorization(true))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
