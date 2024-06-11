export const googleMapsApiKey = 'AIzaSyDyg7iGLE2omc97P2sVA1ZFriTyfVOnIqI';

export const loadMapApi = (callbackName) => {
  if (window.google && window.google.maps) {
    // Si el script ya está cargado, llama directamente al callback
    window[callbackName]();
  } else {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places&callback=${callbackName}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
  }
};
