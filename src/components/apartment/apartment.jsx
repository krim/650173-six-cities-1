import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';
import getRating from '../../libs/get-rating';
import withFavorite from '../../hocs/with-favorite/with-favorite';
import BookmarkButton from '../bookmark-button/bookmark-button.jsx';

const ApartmentTypes = {
  apartment: `Apartment`,
  room: `Private Room`,
  house: `House`,
  hotel: `Hotel`
};

class Apartment extends PureComponent {
  render() {
    const {
      apartment,
      onImageClick,
      onClick,
      onBookmarkClick,
      className
    } = this.props;

    return (
      <article
        className={`${this._getArticleClass()} place-card`}
      >
        { apartment.isPremium && <div className="place-card__mark"><span>Premium</span></div> }
        <div className={`${className}__image-wrapper place-card__image-wrapper`}>
          <a href="#" onClick={onImageClick}>
            <img
              className="place-card__image"
              src={apartment.previewImage}
              alt="Place image"
              {...this._getImageSize()}
            />
          </a>
        </div>

        <div className={`place-card__info${this._getCardClass()}`}>
          <div className={`place-card__price-wrapper`}>
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
          <p className="place-card__type">{ApartmentTypes[apartment.type]}</p>
        </div>
      </article>
    );
  }

  _getCardClass() {
    return this._isFavorite() ? ` favorites__card-info` : ``;
  }

  _getArticleClass() {
    return this._isFavorite() ? ` favorites__card` : `cities__place-card`;
  }

  _getImageSize() {
    return this._isFavorite() ? {width: `150`, height: `110`} : {width: `260`, height: `200`};
  }

  _isFavorite() {
    return this.props.className === `favorites`;
  }
}

Apartment.propTypes = {
  apartment: apartmentProps,
  onClick: PropTypes.func,
  onImageClick: PropTypes.func,
  onBookmarkClick: PropTypes.func,
  className: PropTypes.string.isRequired
};

export {Apartment, ApartmentTypes};
export default withFavorite(Apartment);

