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
    const {apartments} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              apartments.map((apartment) => {

              })
            }
            <li className="locations__item">
              <a className="locations__item-link tabs__item" href="#">
                <span></span>
              </a>
            </li>
          </ul>
        </section>
      </div>
    );
  }
}

TownList.propTypes = {
  apartments: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default TownList;
