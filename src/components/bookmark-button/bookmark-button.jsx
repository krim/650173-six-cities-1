import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

class BookmarkButton extends PureComponent {
  render() {
    const {className, height, width, isFavorite, onBookmarkClick} = this.props;

    return (
      <button
        className={`${className}__bookmark-button button${this._getBookmarkClass(isFavorite)}`}
        type="button"
        onClick={onBookmarkClick}>
        <svg className="place-card__bookmark-icon" width={width} height={height}>
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        <span className="visually-hidden">To bookmarks</span>
      </button>
    );
  }

  _getBookmarkClass(isFavorite) {
    return isFavorite ? ` place-card__bookmark-button--active` : ``;
  }
}

BookmarkButton.propTypes = {
  className: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onBookmarkClick: PropTypes.func
};

export default BookmarkButton;
