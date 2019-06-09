const getRating = (rating) => `${100 * Math.round(rating) / 5}%`;
export default getRating;
