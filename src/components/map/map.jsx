import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {range} from 'react-range-proptypes';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.apartments = this.props.apartments;
    this.mapBuilder = this.props.mapBuilder;
    this.mapPin = this.mapBuilder.icon({
      iconUrl: `img/marker.svg`,
      iconSize: [30, 30]
    });
  }

  componentDidMount() {
    const map = this._initializeMap();
    this._addMarkers(map);
  }

  render() {
    return (
      <section className="cities__map map" id="map"></section>
    );
  }

  _addMarkers(map) {
    this.apartments.forEach((apartment) => this._addMarker(map, apartment.location));
  }

  _addMarker(map, location) {
    this.mapBuilder
      .marker(location, {icon: this.mapPin})
      .addTo(map);
  }

  _initializeMap() {
    const zoom = 12;
    const defaultCoordinates = [52.38333, 4.9];
    const map = this.mapBuilder.map(`map`, {
      center: defaultCoordinates,
      zoom: 12,
      zoomControl: false,
      marker: true
    });
    map.setView(defaultCoordinates, zoom);
    this
      .mapBuilder
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(map);

    return map;
  }
}

Map.propTypes = {
  apartments: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        type: PropTypes.oneOf([`Apartment`, `Private room`]).isRequired,
        image: PropTypes.string.isRequired,
        rating: range(0, 100).isRequired,
        price: PropTypes.number.isRequired,
        currency: PropTypes.oneOf([`euro`, `usd`]).isRequired,
        priceText: PropTypes.string.isRequired,
        premium: PropTypes.bool.isRequired,
        location: PropTypes.arrayOf(PropTypes.number).isRequired
      })
  ),
  mapBuilder: PropTypes.object.isRequired
};

export default Map;
