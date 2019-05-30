import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class City extends PureComponent {
  render() {
    const {name, onClick} = this.props;

    return (
      <li className="locations__item">
        <a className={this._getItemClasses()} onClick={onClick} href="#">
          <span>{name}</span>
        </a>
      </li>
    );
  }

  _getItemClasses() {
    const baseClasses = `locations__item-link tabs__item`;
    return this.props.active ? (baseClasses + ` tabs__item--active`) : baseClasses;
  }
}

City.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default City;

