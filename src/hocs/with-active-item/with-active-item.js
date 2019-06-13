import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps, cityProps} from '../../props';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._onClick = this._onClick.bind(this);
      this._onImageClick = this._onImageClick.bind(this);
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
          onImageClick={this._onImageClick}
          onClick={this._onClick}
        />
      );
    }

    _onImageClick(item) {
      this.setState({activeItem: item});
    }

    _onClick(item) {
      this.props.switchCity(item);
      this.setState({activeItem: item});
    }
  }

  WithActiveItem.propTypes = {
    switchCity: PropTypes.func,
    activeItem: PropTypes.oneOfType([
      apartmentProps,
      cityProps
    ])
  };

  return WithActiveItem;
};

export default withActiveItem;
