import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  avatarUrl: PropTypes.string,
  isPro: PropTypes.bool
});
