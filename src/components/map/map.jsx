import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

import {apartmentProps} from '../../props';

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
    const {pageType} = this.props;

    return (
      <section className={`${pageType}__map map`} id="map"></section>
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
      .marker(this._getCoordinates(location), {icon: this.mapPin})
      .addTo(this.mapLayer);
  }

  _setView() {
    const {location, zoom} = this.mapSettings;
    this.map.setView(this._getCoordinates(location), zoom);
  }

  _initializeMap() {
    this.mapSettings = this.props.mapSettings;
    const {location, zoomControl, marker} = this.mapSettings;
    const mapAttributes = {location: this._getCoordinates(location), zoom: location.zoom, zoomControl, marker};
    this.map = this.mapSettings.builder.map(`map`, mapAttributes);
    this.mapSettings
      .builder
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
  }

  _getCoordinates(location) {
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
  apartments: PropTypes.arrayOf(apartmentProps),
  mapSettings: PropTypes.shape({
    builder: PropTypes.object.isRequired,
    location: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired
    }),
    zoomControl: PropTypes.bool.isRequired,
    marker: PropTypes.bool.isRequired
  }),
  pageType: PropTypes.string.isRequired
};

export default Map;
