import React, { useEffect, useRef, useState } from 'react';
import { googleMapsApiKey } from '../api/MapApi';
import Swal from 'sweetalert2';

const SearchLocation = ({ setLocation }) => {
  const [location, setLocationInput] = useState('');
  const autocompleteRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!window.google) {
      return;
    }

    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const { lat, lng } = place.geometry.location;
        setLocation({ lat: lat(), lng: lng() }, place.name);
      }
    });
    autocompleteRef.current = autocomplete;
  }, []);

  const handleSearch = async () => {
    const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${googleMapsApiKey}`);
    const data = await response.json();
    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      setLocation({ lat, lng }, data.results[0].formatted_address);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Ubicación no encontrada',
        text: 'La ubicación que has ingresado no se pudo encontrar. Por favor, intenta con otra dirección.',
      });
    }
  };

  return (
    <div className="input-group mb-3">
      <input
        type="text"
        className="form-control"
        placeholder="Enter a location"
        ref={inputRef}
        value={location}
        onChange={(e) => setLocationInput(e.target.value)}
      />
      <button className="btn btn-primary" type="button" onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchLocation;
