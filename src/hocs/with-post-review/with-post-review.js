import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation} from '../../reducer/data/data';

const withPostReview = (WrappedComponent) => {
  class WithPostReview extends PureComponent {
    constructor(props) {
      super(props);

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);

      this.state = {
        rating: 0,
        comment: ``
      };
    }

    render() {
      const {rating, comment} = this.state;
      const isSubmitButtonEnabled = rating > 0 && comment.length > 50 && comment.length < 300;

      return (
        <WrappedComponent
          {...this.props}
          rating={this.state.rating}
          comment={this.state.comment}
          isSubmitButtonDisabled={!isSubmitButtonEnabled}
          onFormSubmit={this._handleFormSubmit}
          onRatingChange={this._handleRatingChange}
          onCommentChange={this._handleCommentChange}
        />
      );
    }

    _handleFormSubmit(event) {
      event.preventDefault();
      const {rating, comment} = this.state;
      const {apartmentId} = this.props;

      this.props.postReview({rating, comment}, apartmentId);
    }

    _handleRatingChange(event) {
      this.setState({rating: parseInt(event.target.value, 10)});
    }

    _handleCommentChange(event) {
      this.setState({comment: event.target.value});
    }
  }

  WithPostReview.propTypes = {
    apartmentId: PropTypes.number.isRequired,
    postReview: PropTypes.func.isRequired
  };

  return WithPostReview;
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview: (data) => dispatch(Operation.postReview(data, ownProps.apartmentId))
});

const composedWithPostReview = compose(
    connect(null, mapDispatchToProps),
    withPostReview
);

export {withPostReview};
export default composedWithPostReview;
