import React from 'react';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {ReviewForm} from '../../components/review-form/review-form';
import {withPostReview} from './with-post-review';

configure({adapter: new Adapter()});

describe(`withActiveItem`, () => {
  it(`changes the state and submit form`, () => {
    const postReviewHandler = jest.fn();
    const apartmentId = 1;
    const WrappedReviewForm = withPostReview(ReviewForm);
    const form = mount(
        <WrappedReviewForm
          apartmentId={apartmentId}
          postReview={postReviewHandler}
        />
    );

    const submitButton = form.find(`.reviews__submit`);
    expect(submitButton.props().disabled ).toEqual(true);

    expect(form.state(`rating`)).toEqual(0);
    expect(form.state(`comment`)).toEqual(``);

    const ratingRadio = form.find(`input.form__rating-input`).first();
    ratingRadio.simulate(`change`);
    expect(form.state(`rating`)).toEqual(5);

    const reviewText = `Long long long long long long long long long long long long long text`;
    const textArea = form.find(`textarea#review`);
    textArea.instance().value = reviewText;
    textArea.simulate(`change`);
    expect(form.state(`comment`)).toEqual(reviewText);

    const updatedSubmitButton = form.find(`.reviews__submit`);
    expect(updatedSubmitButton.props().disabled).toEqual(false);

    const reviewForm = form.find(`form.reviews__form`);
    reviewForm.simulate(`submit`);
    expect(postReviewHandler).toHaveBeenCalledTimes(1);
    expect(postReviewHandler).toHaveBeenNthCalledWith(1, {rating: 5, comment: reviewText}, apartmentId);
  });
});

