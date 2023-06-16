
var map = L.map('map').setView([0, 0], 2);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);


var marker = L.marker([0, 0]).addTo(map);


async function fetchSpaceStationData() {
  try {
    const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}


async function updateMarkerPosition() {
  const spaceStationData = await fetchSpaceStationData();
  if (spaceStationData) {
    const { latitude, longitude } = spaceStationData;
    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 4);
  }
}


setInterval(updateMarkerPosition, 10); 
