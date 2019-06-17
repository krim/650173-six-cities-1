import React, {PureComponent} from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Operation as DataOperation, Operation} from '../../reducer/data/data';
import {getError} from '../../reducer/data/selectors';

const withPostReview = (WrappedComponent) => {
  class WithPostReview extends PureComponent {
    constructor(props) {
      super(props);

      this._handleFormSubmit = this._handleFormSubmit.bind(this);
      this._handleRatingChange = this._handleRatingChange.bind(this);
      this._handleCommentChange = this._handleCommentChange.bind(this);
      this.postReview = this.props.postReview.bind(this);
      this.setError = this.props.setError.bind(this);

      this.state = {
        rating: 0,
        comment: ``
      };
    }

    render() {
      const {rating, comment} = this.state;
      const {error} = this.props;
      const isSubmitButtonEnabled = rating > 0 && comment.length > 50 && comment.length < 300;

      return (
        <WrappedComponent
          {...this.props}
          error={error}
          rating={rating}
          comment={comment}
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

      this.postReview({rating, comment}, apartmentId)
        .then(() => {
          this.setError(null);
          this.setState({rating: 0, comment: ``});
        })
        .catch((error) => {
          this.setError(error.response.data.error);
        });
    }

    _handleRatingChange(event) {
      this.setState({rating: parseInt(event.target.value, 10)});
    }

    _handleCommentChange(event) {
      this.setState({comment: event.target.value});
    }
  }

  WithPostReview.propTypes = {
    error: PropTypes.string,
    apartmentId: PropTypes.number.isRequired,
    postReview: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired
  };

  return WithPostReview;
};

const mapStateToProps = (state) => {
  return {
    error: getError(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  postReview: (data) => dispatch(Operation.postReview(data, ownProps.apartmentId)),
  setError: (error) => dispatch(DataOperation.setError(error))
});

const composedWithPostReview = compose(
    connect(mapStateToProps, mapDispatchToProps),
    withPostReview
);

export {withPostReview};
export default composedWithPostReview;
