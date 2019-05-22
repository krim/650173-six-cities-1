import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer';

import Town from '../town/town.jsx';

class TownList extends PureComponent {
  render() {
    const {towns} = this.props;

    return (
      <div className="cities tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {
              towns.map((town) => {
                return <Town
                  key={town.title}
                  town={town}
                  onClick={() => this.props.switchTown(town)}
                  active={this.props.activeTown.title === town.title}
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
  activeTown: PropTypes.shape({
    title: PropTypes.string.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  switchTown: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => Object.assign({}, ownProps, {
  activeTown: state.town
});

const mapDispatchToProps = (dispatch) => ({
  switchTown: (town) => dispatch(ActionCreator.switchTown(town))
});

export {TownList};

export default connect(mapStateToProps, mapDispatchToProps)(TownList);
