import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class TownList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeApartment: undefined
    };
  }

  render() {
    const {towns} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              towns.map((town) => {
                return (
                  <li className="locations__item" key={town.title}>
                    <a className="locations__item-link tabs__item" href="#">
                      <span>{town.title}</span>
                    </a>
                  </li>
                );
              })
            }
          </ul>
        </section>
      </div>
    );
  }
}

TownList.propTypes = {
  towns: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TownList;
