import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import withPostReview from '../../hocs/with-post-review/with-post-review';

class ReviewForm extends PureComponent {
  render() {
    const {
      isSubmitButtonDisabled,
      onRatingChange,
      onCommentChange,
      onFormSubmit
    } = this.props;

    return (
      <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
        <label className="reviews__label form__label" htmlFor="review">Your review</label>
        <div className="reviews__rating-form form__rating">
          {
            this._getRatings().map((ratingData) => {
              return (
                <React.Fragment key={`mark-${ratingData.mark}`}>
                  <input
                    className="form__rating-input visually-hidden"
                    name="rating"
                    value={`${ratingData.mark}`}
                    id={`${ratingData.mark}-stars`}
                    onChange={onRatingChange}
                    type="radio"
                  />
                  <label
                    htmlFor={`${ratingData.mark}-stars`}
                    className="reviews__rating-label form__rating-label"
                    title={ratingData.title}
                  >
                    <svg className="form__star-image" width="37" height="33">
                      <use xlinkHref="#icon-star"></use>
                    </svg>
                  </label>
                </React.Fragment>
              );
            })
          }
        </div>
        <textarea
          className="reviews__textarea form__textarea"
          id="review"
          name="review"
          onChange={onCommentChange}
          placeholder="Tell how was your stay, what you like and what can be improved"
        ></textarea>
        <div className="reviews__button-wrapper">
          <p className="reviews__help">
            To submit review please make sure to set <span className="reviews__star">rating</span> and
            describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
          </p>
          <button
            className="reviews__submit form__submit button"
            type="submit"
            disabled={isSubmitButtonDisabled}
          >Submit</button>
        </div>
      </form>
    );
  }

  _getRatings() {
    return [
      {title: `perfect`, mark: 5},
      {title: `good`, mark: 4},
      {title: `not bad`, mark: 3},
      {title: `badly`, mark: 2},
      {title: `terribly`, mark: 1}
    ];
  }
}

ReviewForm.propTypes = {
  onRatingChange: PropTypes.func.isRequired,
  onCommentChange: PropTypes.func.isRequired,
  onFormSubmit: PropTypes.func.isRequired,
  isSubmitButtonDisabled: PropTypes.bool.isRequired
};

export {ReviewForm};
export default withPostReview(ReviewForm);
