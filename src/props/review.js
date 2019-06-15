import PropTypes from 'prop-types';
import userProps from './user';

export default PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: userProps,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  date: PropTypes.number.isRequired
});
