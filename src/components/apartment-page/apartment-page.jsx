import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import getRating from '../../libs/get-rating';
import {apartmentProps, mapSettingsProps} from '../../props';
import {getNearApartments} from '../../reducer/data/selectors';
import ReviewList from '../review-list/review-list.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';
import Map from '../map/map.jsx';
import withFavorite from '../../hocs/with-favorite/with-favorite';
import withApartment from '../../hocs/with-apartment/with-apartment';
import {Operation} from '../../reducer/data/data';

const MAX_IMAGES_COUNT = 6;
const MAX_NEAR_APARTMENTS_COUNT = 2;

class ApartmentPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      apartment,
      nearApartments,
      mapSettings,
      onBookmarkClick,
      setApartment
    } = this.props;

    const {host} = apartment;

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                apartment.images.slice(0, MAX_IMAGES_COUNT).map((image, index) => {
                  return (
                    <div key={`image-${index}`} className="property__image-wrapper">
                      <img className="property__image" src={image} alt="Photo studio" />
                    </div>
                  );
                })
              }
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                <span>Premium</span>
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {apartment.title}
                </h1>
                <BookmarkButton
                  className={`property`}
                  height={`33`}
                  width={`31`}
                  isFavorite={apartment.isFavorite}
                  onBookmarkClick={onBookmarkClick}
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: getRating(apartment.rating)}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{apartment.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  Entire place
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {apartment.bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {apartment.maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{apartment.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {
                    apartment.goods.map((advantage, index) => {
                      return (
                        <li key={`advantage-${index}`} className="property__inside-item">
                          {advantage}
                        </li>
                      );
                    })
                  }
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    { host.name }
                  </span>
                  { host.isPro && <span className="property__user-status">Pro</span> }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    { apartment.description }
                  </p>
                </div>
              </div>
              <ReviewList apartmentId={apartment.id} />
            </div>
          </div>
          {
            nearApartments.length > 0 &&
              <Map
                apartments={nearApartments.slice(0, MAX_NEAR_APARTMENTS_COUNT).concat(apartment)}
                activeApartment={apartment}
                mapSettings={
                  {...mapSettings, location: apartment.city.location}
                }
                pageType={`property`}
              />
          }
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <ApartmentList apartments={nearApartments} setApartment={setApartment} />
            </div>
          </section>
        </div>
      </main>
    );
  }
}

ApartmentPage.propTypes = {
  mapSettings: mapSettingsProps,
  apartment: apartmentProps,
  nearApartments: PropTypes.arrayOf(apartmentProps),
  onBookmarkClick: PropTypes.func,
  setApartment: PropTypes.func
};

const mapStateToProps = (state, props) => {
  return {
    nearApartments: getNearApartments(state, props.match.params)
  };
};

const mapDispatchToProps = (dispatch) => ({
  setApartment: (apartment) => dispatch(Operation.setApartment(apartment))
});

const ApartmentPageWithState = connect(mapStateToProps, mapDispatchToProps)(ApartmentPage);

export {ApartmentPage};
export {ApartmentPageWithState};
export default withApartment(
    withFavorite(ApartmentPageWithState)
);
