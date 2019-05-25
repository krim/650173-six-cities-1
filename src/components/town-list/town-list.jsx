import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Town from '../town/town.jsx';

class TownList extends PureComponent {
  render() {
    const {towns, activeItem} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              towns.map((town) => {
                return <Town
                  key={town.title}
                  title={town.title}
                  onClick={this._onClick(town)}
                  active={activeItem && activeItem.title === town.title}
                />;
              })
            }
          </ul>
        </section>
      </div>
    );
  }

  _onClick(town) {
    return () => {
      const {switchTown} = this.props;
      switchTown(town);
      this.setState({activeItem: town});
    };
  }
}

TownList.propTypes = {
  towns: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  switchTown: PropTypes.func.isRequired
};

export default TownList;
