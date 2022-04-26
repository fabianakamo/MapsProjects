let map;
let markers = [];
let currentPosition;
let currentMarker;

function initMap() {
  //Pegar elemento 'map' do html via javascript
  const mapElement = document.getElementById("map");

  // Buscar a localização usando api navigator
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      // Criar instancia do Mapa com elemento HTML
      map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: currentPosition,
      });

      // Criar Marker
      currentMarker = new google.maps.Marker({
        map,
        position: currentPosition,
        label: "Home",
      });
    });
  }
  initAutoComplete();
}

function initAutoComplete() {
  const inputOrigin = document.getElementById("origin");

  const options = {
    types: ["(cities)"],
  };

  let autoCompleteOrigin = new google.maps.places.Autocomplete(
    inputOrigin,
    options
  );

  // Autocomplete Input Origin
  autoCompleteOrigin.addListener("place_changed", () => {
    const place = autoCompleteOrigin.getPlace();
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    const origin = { lat, lng };

    const originMarker = new google.maps.Marker({
      position: origin,
      map,
      label: "Endereço de Origem",
    });

    markers.push(originMarker);
    map.setCenter(origin);
  });
}

// Autocomplete Input Destination
