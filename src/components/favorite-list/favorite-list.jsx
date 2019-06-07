import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/favorite/favorite';
import {getFavorites} from '../../reducer/favorite/selectors';
import {apartmentProps} from '../../props';
import Apartment from '../apartment/apartment.jsx';
import FavoriteEmptyList from '../favorite-empty-list/favorite-empty-list.jsx';

class FavoriteList extends PureComponent {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites} = this.props;

    if (favorites.length === 0) {
      return <FavoriteEmptyList />;
    }

    return (
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {
                favorites.map((favorite) => {
                  return (
                    <li key={favorite.city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a className="locations__item-link" href="#">
                            <span>{favorite.city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {this._renderApartments(favorite.apartments)}
                      </div>
                    </li>
                  );
                })
              }
            </ul>
          </section>
        </div>
      </main>
    );
  }

  _renderApartments(apartments) {
    return apartments.map((apartment) => {
      return (
        // TODO: передавать класс favorites
        <Apartment
          key={`apartment-${apartment.id}`}
          apartment={apartment}
          onClick={() => {}}
          setActive={() => {}}
          disableActive={() => {}}
        />
      );
    });
  }
}

FavoriteList.propTypes = {
  favorites: PropTypes.arrayOf(
      PropTypes.shape({
        city: PropTypes.string.isRequired,
        apartments: PropTypes.arrayOf(apartmentProps).isRequired
      })
  ),
  loadFavorites: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    favorites: getFavorites(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadFavorites: () => dispatch(Operation.loadFavorites())
});

export {FavoriteList};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList);
