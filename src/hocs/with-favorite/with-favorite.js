import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/favorite/favorite';

const withFavorite = (WrappedComponent) => {
  class WithFavorite extends PureComponent {
    constructor(props) {
      super(props);

      this._onBookmarkClick = this._onBookmarkClick.bind(this);
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onBookmarkClick={this._onBookmarkClick}
        />
      );
    }

    _onBookmarkClick(apartment) {
      const {addToFavorites, removeFromFavorites} = this.props;

      if (apartment.isFavorite) {
        removeFromFavorites(apartment.id);
      } else {
        addToFavorites(apartment.id);
      }
    }
  }

  WithFavorite.propTypes = {
    addToFavorites: PropTypes.func,
    removeFromFavorites: PropTypes.func
  };

  return WithFavorite;
};

const mapDispatchToProps = (dispatch) => ({
  addToFavorites: (apartment) => dispatch(Operation.addToFavorites(apartment)),
  removeFromFavorites: (apartment) => dispatch(Operation.removeFromFavorites(apartment))
});

const composedWithFavorite = compose(
    connect(null, mapDispatchToProps),
    withFavorite
);

export {withFavorite};
export default composedWithFavorite;
