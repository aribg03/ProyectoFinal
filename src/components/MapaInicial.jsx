import React, { useState, useEffect } from 'react';
import LocationModal from './LocationModal';

const MapaInicial = ({ center, markerPosition }) => {
  const [showModal, setShowModal] = useState(false);
  const [location, setLocation] = useState(null);

  const handleMarkerClick = () => {
    setLocation(markerPosition);
    setShowModal(true);
  };

  useEffect(() => {
    if (!window.google || !window.google.maps) return;

    const map = new window.google.maps.Map(document.getElementById('mapa'), {
      center: center,
      zoom: 15,
    });

    const marker = new window.google.maps.Marker({
      position: markerPosition,
      map: map,
      title: '',
    });

    marker.addListener('click', () => {
      handleMarkerClick();
    });

    window.map = map;
    window.marker = marker;
  }, [center, markerPosition]);

  return (
    <div>
      <div id="mapa" style={{ height: '400px' }} />
      {location && (
        <LocationModal
          show={showModal}
          handleClose={() => setShowModal(false)}
          location={location}
        />
      )}
    </div>
  );
};

export default MapaInicial;
