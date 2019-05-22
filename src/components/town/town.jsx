import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class Town extends PureComponent {
  render() {
    const {town, onClick} = this.props;

    return (
      <li className="locations__item" key={town.title}>
        <a className={this._itemClasses} onClick={onClick} href="#">
          <span>{town.title}</span>
        </a>
      </li>
    );
  }

  get _itemClasses() {
    const baseClasses = `locations__item-link tabs__item`;
    return this.props.active ? (baseClasses + ` tabs__item--active`) : baseClasses;
  }
}

Town.propTypes = {
  town: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  active: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Town;

