import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {Operation} from '../../reducer/data/data';
import {getFavorites} from '../../reducer/data/selectors';
import {userProps, apartmentProps} from '../../props';
import FavoriteEmptyList from '../favorite-empty-list/favorite-empty-list.jsx';
import Footer from '../footer/footer.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import Header from '../header/header.jsx';

class FavoriteList extends PureComponent {
  componentDidMount() {
    this.props.loadFavorites();
  }

  render() {
    const {favorites, user} = this.props;

    if (favorites.length === 0) {
      return <FavoriteEmptyList user={user}/>;
    }

    return (
      <div className="page">
        <Header user={user} />
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
                          <ApartmentList
                            apartments={favorite.apartments}
                            onImageClick={() => {}}
                            setApartment={() => {}}
                            className={`favorites`}
                          />
                        </div>
                      </li>
                    );
                  })
                }
              </ul>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

FavoriteList.propTypes = {
  user: userProps,
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadFavorites: () => dispatch(Operation.loadFavorites(ownProps))
});

export {FavoriteList};
export default connect(mapStateToProps, mapDispatchToProps)(FavoriteList);
