import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps, cityProps} from '../../props';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._handleClick = this._handleClick.bind(this);
      this._handleImageClick = this._handleImageClick.bind(this);
      this.state = {
        activeItem: undefined
      };
    }

    componentDidMount() {
      this.setState({activeItem: this.props.activeItem});
    }

    render() {
      return (
        <WrappedComponent
          {...this.props}
          onImageClick={this._handleImageClick}
          onClick={this._handleClick}
        />
      );
    }

    _handleImageClick(item) {
      this.props.setApartment(item);
      this.setState({activeItem: item});
    }

    _handleClick(item) {
      this.props.switchCity(item);
      this.setState({activeItem: item});
    }
  }

  WithActiveItem.propTypes = {
    setApartment: PropTypes.func,
    switchCity: PropTypes.func,
    activeItem: PropTypes.oneOfType([
      apartmentProps,
      cityProps
    ])
  };

  return WithActiveItem;
};

export default withActiveItem;
