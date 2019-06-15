import React, {PureComponent} from 'react';

import {reviewProps} from '../../props';
import getRating from '../../libs/get-rating';

class Review extends PureComponent {
  render() {
    const {review} = this.props;
    const {user} = review;

    return (
      <React.Fragment>
        <div className="reviews__user user">
          <div className="reviews__avatar-wrapper user__avatar-wrapper">
            <img
              className="reviews__avatar user__avatar"
              src={user.avatarUrl}
              width="54"
              height="54"
              alt="Reviews avatar"
            />
          </div>
          <span className="reviews__user-name">
            { user.name }
          </span>
        </div>
        <div className="reviews__info">
          <div className="reviews__rating rating">
            <div className="reviews__stars rating__stars">
              <span style={{width: getRating(review.rating)}}></span>
              <span className="visually-hidden">Rating</span>
            </div>
          </div>
          <p className="reviews__text">
            {review.comment}
          </p>
          <time className="reviews__time" dateTime={this._getFormatedDateTime(review.date)}>
            {this._getFormatedDate(review.date)}
          </time>
        </div>
      </React.Fragment>
    );
  }

  _getFormatedDateTime(date) {
    return new Date(date).toISOString().substr(0, 10);
  }

  _getFormatedDate(date) {
    const options = {year: `numeric`, month: `long`};
    return new Date(date).toLocaleString(`en-US`, options);
  }
}

Review.propTypes = {
  review: reviewProps
};

export default Review;
