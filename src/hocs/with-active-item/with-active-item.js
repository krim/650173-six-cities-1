import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withActiveItem = (WrappedComponent) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this._disableActive = this._disableActive.bind(this);
      this._setActive = this._setActive.bind(this);
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
          setActive={this._setActive}
          disableActive={this._disableActive}
          onClick={this._onClick}
        />
      );
    }

    _setActive(item) {
      this.setState({activeItem: item});
    }

    _disableActive() {
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
