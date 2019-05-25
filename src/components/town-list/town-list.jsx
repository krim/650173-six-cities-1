import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import Town from '../town/town.jsx';
import withActiveItem from '../../hocs/with-active-item/with-active-item';

class TownList extends PureComponent {
  render() {
    const {towns, activeItem, onClick} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              towns.map((town) => {
                return <Town
                  key={town.title}
                  title={town.title}
                  onClick={() => onClick(town)}
                  active={activeItem.title === town.title}
                />;
              })
            }
          </ul>
        </section>
      </div>
    );
  }
}

TownList.propTypes = {
  towns: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  onClick: PropTypes.func.isRequired
};

export {TownList};
export default withActiveItem(TownList);
