import PropTypes from 'prop-types';

export default PropTypes.shape({
  builder: PropTypes.object.isRequired,
  zoomControl: PropTypes.bool.isRequired,
  marker: PropTypes.bool.isRequired
});
