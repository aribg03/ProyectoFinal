import React, { useEffect, useState } from 'react';
import SearchLocation from './components/SearchLocation';
import MapaInicial from './components/MapaInicial';
import { loadMapApi } from './api/MapApi';
import './assets/index.css'

const defaultCenter = { lat: 18.0816, lng: -96.1482 };
const defaultMarkerPosition = { lat: 18.0816, lng: -96.1482 };

const App = () => {
  const [center, setCenter] = useState(defaultCenter);
  const [markerPosition, setMarkerPosition] = useState(defaultMarkerPosition);
  const [locations, setLocations] = useState([]);
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  const handleSetLocation = (latLng, name) => {
    setCenter(latLng);
    setMarkerPosition(latLng);

    const newLocation = { name, latLng };
    const updatedLocations = [newLocation, ...locations.filter(loc => loc.name !== name)].slice(0, 5);
    setLocations(updatedLocations);
    localStorage.setItem('lastLocation', JSON.stringify(latLng));
    localStorage.setItem('locations', JSON.stringify(updatedLocations));
  };

  useEffect(() => {
    const lastLocation = localStorage.getItem('lastLocation');
    if (lastLocation) {
      const location = JSON.parse(lastLocation);
      setCenter({ lat: location.lat, lng: location.lng });
      setMarkerPosition({ lat: location.lat, lng: location.lng });
    }

    const savedLocations = localStorage.getItem('locations');
    if (savedLocations) {
      setLocations(JSON.parse(savedLocations));
    }

    window.initMap = () => {
      setIsMapLoaded(true);
    };

    loadMapApi('initMap');
  }, []);

  return (
    <div className="container">
      <h1>Map App</h1>
      <hr />
      <SearchLocation setLocation={handleSetLocation} />
      {isMapLoaded ? (
        <MapaInicial center={center} markerPosition={markerPosition} />
      ) : (
        <p>Loading map...</p>
      )}
      <hr />
      <h3>Last 5 Locations</h3>
      <ul className="list-group">
        {locations.map((location, index) => (
          <li
            key={index}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={() => handleSetLocation(location.latLng, location.name)}
          >
            {location.name}
            <i className="bi bi-geo-alt"></i>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
