import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';

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
        { apartment.isPremium && <div className="place-card__mark"><span>Premium</span></div> }
        <div className="cities__image-wrapper place-card__image-wrapper">
          <a href="#">
            <img
              className="place-card__image" src={apartment.previewImage} width="260" height="200" alt="Place image"
            />
          </a>
        </div>
        <div className="place-card__info">
          <div className="place-card__price-wrapper">
            <div className="place-card__price">
              <b className="place-card__price-value">&euro;{apartment.price}</b>
              <span className="place-card__price-text">&#47;&nbsp;{apartment.description}</span>
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

  _rating(rating) {
    return `${100 * rating / 5}%`;
  }
}

Apartment.propTypes = {
  apartment: apartmentProps,
  onClick: PropTypes.func.isRequired,
  setActive: PropTypes.func.isRequired,
  disableActive: PropTypes.func.isRequired
};

export default Apartment;

