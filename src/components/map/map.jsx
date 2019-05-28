import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {range} from 'react-range-proptypes';

class Map extends PureComponent {
  componentDidMount() {
    this._initializeMap();
    this._initializePin();
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
    const {apartments} = this.props;
    this.mapLayer = this.mapSettings.builder.layerGroup().addTo(this.map);
    apartments.forEach((apartment) => this._addMarker(apartment.location));
  }

  _addMarker(location) {
    this.mapSettings
      .builder
      .marker(this._latLng(location), {icon: this.mapPin})
      .addTo(this.mapLayer);
  }

  _setView() {
    const {location, zoom} = this.mapSettings;
    this.map.setView(this._latLng(location), zoom);
  }

  _initializeMap() {
    this.mapSettings = this.props.mapSettings;
    const {location, zoomControl, marker} = this.mapSettings;
    const mapAttributes = {location: this._latLng(location), zoom: location.zoom, zoomControl, marker};
    this.map = this.mapSettings.builder.map(`map`, mapAttributes);
    this.mapSettings
      .builder
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
  }

  _latLng(location) {
    return [location.latitude, location.longitude];
  }

  _initializePin() {
    this.mapPin = this.mapSettings.builder.icon({
      iconUrl: `img/marker.svg`,
      iconSize: [30, 30]
    });
  }
}

Map.propTypes = {
  apartments: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
        previewImage: PropTypes.string.isRequired,
        rating: range(0, 100).isRequired,
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        bedrooms: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        isFavorite: PropTypes.bool.isRequired,
        isPremium: PropTypes.bool.isRequired,
        location: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired
        }),
        host: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          isPro: PropTypes.bool.isRequired,
          avatarUrl: PropTypes.string.isRequired
        }),
      })
  ),
  mapSettings: PropTypes.shape({
    builder: PropTypes.object.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }),
    zoomControl: PropTypes.bool.isRequired,
    marker: PropTypes.bool.isRequired
  })
};

export default Map;
