import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import htmlParser from 'html-react-parser';
import {range} from 'react-range-proptypes';

class Apartment extends PureComponent {
  render() {
    const {
      apartment,
      onClick,
      setActive,
      disableActive
    } = this.props;

    return (
      <article
        onMouseOver={setActive}
        onMouseOut={disableActive}
        className="cities__place-card place-card"
      >
        { apartment.premium && <div className="place-card__mark"><span>Premium</span></div> }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image" src={apartment.image} width="260" height="200" alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">{this._currency(apartment.currency)}{apartment.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;{apartment.priceText}</span>
            </div>
            <button className="place-card__bookmark-button button" type="button">
              <svg className="place-card__bookmark-icon" width="18" height="19">
                <use xlinkHref="#icon-bookmark"></use>
              </svg>
              <span className="visually-hidden">To bookmarks</span>
            </button>
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: this._rating(apartment.rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" onClick={onClick}>{ apartment.name }</a>
          </h2>
          <p className="place-card__type">{apartment.type}</p>
        </div>
      </article>
    );
  }

  _currency(currency) {
    const Currencies = {
      euro: `&euro;`
    };

    return htmlParser(Currencies[currency]);
  }

  _rating(rating) {
    return `${rating}%`;
  }
}

Apartment.propTypes = {
  apartment: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
    image: PropTypes.string.isRequired,
    rating: range(0, 100).isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.oneOf([`euro`, `usd`]).isRequired,
    priceText: PropTypes.string.isRequired,
    premium: PropTypes.bool.isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
  }),
  onClick: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  disableActive: PropTypes.func.isRequired
};

export default Apartment;

