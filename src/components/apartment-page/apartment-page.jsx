import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import getRating from '../../libs/get-rating';
import {apartmentProps} from '../../props';
import {Operation} from '../../reducer/data/data';
import {getApartmentById, getNearApartmentsById} from '../../reducer/data/selectors';
import ReviewList from '../review-list/review-list.jsx';
import ApartmentList from '../apartment-list/apartment-list.jsx';

class ApartmentPage extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.setApartmentId(this._getApartmentId());
    }
  }

  componentDidMount() {
    this.props.setApartmentId(this._getApartmentId());
  }

  render() {
    const {apartment, nearApartments} = this.props;
    const isApartmentExist = apartment && Object.keys(apartment).length > 0;

    if (!isApartmentExist) {
      return <></>;
    }

    return (
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {
                apartment.images.map((image, index) => {
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
                <button className="property__bookmark-button button" type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
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
                      src="img/avatar-angelina.jpg"
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">
                    { apartment.host.name }
                  </span>
                  { apartment.host.isPro && <span className="property__user-status">Pro</span> }
                </div>
                <div className="property__description">
                  <p className="property__text">
                    { apartment.description }
                  </p>
                </div>
              </div>
              <ReviewList />
            </div>
          </div>
          <section className="property__map map"></section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <div className="near-places__list places__list">
              <ApartmentList apartments={nearApartments} />
            </div>
          </section>
        </div>
      </main>
    );
  }

  _getApartmentId() {
    return parseInt(this.props.match.params.id, 10);
  }
}

ApartmentPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired
    })
  }),
  apartment: apartmentProps,
  nearApartments: PropTypes.arrayOf(apartmentProps),
  setApartmentId: PropTypes.func.isRequired
};

export {ApartmentPage};

const mapStateToProps = (state) => {
  return {
    apartment: getApartmentById(state),
    nearApartments: getNearApartmentsById(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  setApartmentId: (id) => dispatch(Operation.setApartmentId(id))
});


export default connect(mapStateToProps, mapDispatchToProps)(ApartmentPage);

