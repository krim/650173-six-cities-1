import React, {PureComponent} from 'react';

import {reviewProps} from '../../props';
import PropTypes from 'prop-types';
import Review from '../review/review.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import {Operation} from '../../reducer/data/data';
import {getApartmentId, getReviews} from '../../reducer/data/selectors';
import {connect} from "react-redux";

class ReviewList extends PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.loadReviews(this.props.apartmentId);
  }

  render() {
    const {reviews} = this.props;

    return (
      <section className="property__reviews reviews">
        <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">1</span></h2>
        <ul className="reviews__list">
          <li className="reviews__item">
            { reviews.map((review) => <Review key={`review-${review.id}`} review={review} />) }
          </li>
        </ul>
        <ReviewForm />
      </section>
    );
  }
}

ReviewList.propTypes = {
  apartmentId: PropTypes.number.isRequired,
  reviews: PropTypes.arrayOf(reviewProps),
  loadReviews: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    reviews: getReviews(state),
    apartmentId: getApartmentId(state)
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadReviews: (id) => dispatch(Operation.loadReviews(id))
});

export {ReviewList};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewList);
