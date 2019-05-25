import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._mouseOut = this._mouseOut.bind(this);
      this._mouseOver = this._mouseOver.bind(this);
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
          mouseOver={this._mouseOver}
          mouseOut={this._mouseOut}
          onClick={this._onClick}
        />
      );
    }

    _mouseOver(item) {
      this.setState({activeItem: item});
    }

    _mouseOut() {
      this.setState({activeItem: undefined});
    }

    _onClick(item) {
      this.props.switchTown(item);
      this.setState({activeItem: item});
    }
  }

  WithActiveItem.propTypes = {
    switchTown: PropTypes.func
  };

  return WithActiveItem;
};

export default withActiveItem;
