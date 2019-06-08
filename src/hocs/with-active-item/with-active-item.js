import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps, cityProps} from '../../props';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._onMouseOut = this._onMouseOut.bind(this);
      this._onMouseOver = this._onMouseOver.bind(this);
      this._onClick = this._onClick.bind(this);
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
          onMouseOver={this._onMouseOver}
          onMouseOut={this._onMouseOut}
          onClick={this._onClick}
        />
      );
    }

    _onMouseOver(item) {
      this.setState({activeItem: item});
    }

    _onMouseOut() {
      this.setState({activeItem: undefined});
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
