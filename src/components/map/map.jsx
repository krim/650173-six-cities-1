import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {range} from 'react-range-proptypes';

class Map extends PureComponent {
  constructor(props) {
    super(props);

    this.mapSettings = this.props.mapSettings;
    this.mapPin = this.mapSettings.builder.icon({
      iconUrl: `img/marker.svg`,
      iconSize: [30, 30]
    });
  }

  componentDidMount() {
    this._initializeMap();
    this._setView();
    this._addMarkers();
  }

  componentDidUpdate() {
    this.mapSettings = this.props.mapSettings;
    this._setView();
    this._addMarkers();
  }

  render() {
    return (
      <section className="cities__map map" id="map"></section>
    );
  }

  _addMarkers() {
    if (this.mapLayer) {
      this.mapLayer.clearLayers();
    }
    this.mapLayer = this.mapSettings.builder.layerGroup().addTo(this.map);
    this.props.apartments.forEach((apartment) => this._addMarker(apartment.coordinates));
  }

  _addMarker(coordinates) {
    this.mapSettings
      .builder
      .marker(coordinates, {icon: this.mapPin})
      .addTo(this.mapLayer);
  }

  _setView() {
    const {centerCoordinates, zoom} = this.mapSettings;
    this.map.setView(centerCoordinates, zoom);
  }

  _initializeMap() {
    const {centerCoordinates, zoom, zoomControl, marker} = this.mapSettings;
    this.map = this.mapSettings.builder.map(`map`, {centerCoordinates, zoom, zoomControl, marker});
    this.mapSettings
      .builder
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
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
        coordinates: PropTypes.arrayOf(PropTypes.number).isRequired
      })
  ),
  mapSettings: PropTypes.shape({
    builder: PropTypes.object.isRequired,
    zoom: PropTypes.number.isRequired,
    centerCoordinates: PropTypes.arrayOf(PropTypes.number).isRequired,
    zoomControl: PropTypes.bool.isRequired,
    marker: PropTypes.bool.isRequired
  })
};

export default Map;
