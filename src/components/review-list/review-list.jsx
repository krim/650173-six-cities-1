import React, {Component} from 'react';

import {reviewProps} from '../../props';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import Review from '../review/review.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {Operation} from '../../reducer/data/data';
import {getSortedReviews} from '../../reducer/data/selectors';

class ReviewList extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadReviews(this.props.apartmentId);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.apartmentId !== this.props.apartmentId) {
      this.props.loadReviews(this.props.apartmentId);
    }
  }

  render() {
    const {reviews, apartmentId, isUserAuthorized} = this.props;

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
        <ul className="reviews__list">
          {
            reviews.map((review) => {
              return (
                <li className="reviews__item" key={`review-${review.id}`}>
                  <Review review={review} />
                </li>
              );
            })
          }
        </ul>

        {isUserAuthorized && <ReviewForm apartmentId={apartmentId}/>}
      </section>
    );
  }
}

ReviewList.propTypes = {
  apartmentId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewProps),
  loadReviews: PropTypes.func.isRequired,
  isUserAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
  return {
    reviews: getSortedReviews(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => dispatch(Operation.loadReviews(id))
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
