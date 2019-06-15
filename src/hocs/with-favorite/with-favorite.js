import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/data/data';
import {apartmentProps} from '../../props';

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

    _onBookmarkClick() {
      const {addToFavorites, removeFromFavorites, apartment} = this.props;

      if (apartment.isFavorite) {
        removeFromFavorites(apartment.id);
      } else {
        addToFavorites(apartment.id);
      }
    }
  }

  WithFavorite.propTypes = {
    apartment: apartmentProps,
    addToFavorites: PropTypes.func.isRequired,
    removeFromFavorites: PropTypes.func.isRequired
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
