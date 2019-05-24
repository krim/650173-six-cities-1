import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Town extends PureComponent {
  render() {
    const {title, onClick} = this.props;

    return (
      <li className="locations__item">
        <a className={this._itemClasses()} onClick={onClick} href="#">
          <span>{title}</span>
        </a>
      </li>
    );
  }

  _itemClasses() {
    const baseClasses = `locations__item-link tabs__item`;
    return this.props.active ? (baseClasses + ` tabs__item--active`) : baseClasses;
  }
}

Town.propTypes = {
  title: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Town;

