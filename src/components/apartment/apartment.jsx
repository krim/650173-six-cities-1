import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import getRating from '../../libs/get-rating';
import withFavorite from '../../hocs/with-favorite/with-favorite';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';

class Apartment extends PureComponent {
  render() {
    const {
      apartment,
      onClick,
      onMouseOver,
      onMouseOut,
      onBookmarkClick
    } = this.props;

    return (
      <article
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
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
              <span className="place-card__price-text">&#47;&nbsp;night</span>
            </div>
            <BookmarkButton
              className={`place-card`}
              height={`19`}
              width={`18`}
              isFavorite={apartment.isFavorite}
              onBookmarkClick={onBookmarkClick}
            />
          </div>
          <div className="place-card__rating rating">
            <div className="place-card__stars rating__stars">
              <span style={{width: getRating(apartment.rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <h2 className="place-card__name">
            <a href="#" onClick={onClick}>{apartment.title}</a>
          </h2>
          <p className="place-card__type">{this._getApartmentType(apartment.type)}</p>
        </div>
      </article>
    );
  }

  _getApartmentType(type) {
    return {
      apartment: `Apartment`,
      room: `Private Room`,
      house: `House`,
      hotel: `Hotel`
    }[type];
  }
}

Apartment.propTypes = {
  apartment: apartmentProps,
  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onBookmarkClick: PropTypes.func
};

export {Apartment};
export default withFavorite(Apartment);

