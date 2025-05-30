// ------------------ CCTV Map Script ------------------
    
const map = L.map('map').setView([8.5840037, 123.343394], 12);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const cameraFeed = document.getElementById("camera-feed");
const cameraBox = document.getElementById("camera-box");
const fullscreenIcon = document.getElementById("fullscreen-icon");

const cameras = [
  { name: 'CAPITOL', lat: 8.584019616237114, lng: 123.3460294872061, ip: '192.168.0.153' },
  { name: 'PROVINCIAL LIBRARY', lat: 8.583830849814026, lng: 123.34714290269856, ip: '192.168.0.156' },
  { name: 'ZNCEC/ZNCSC', lat: 8.584186782963279, lng: 123.34761972293995, ip: '192.168.0.159' },
  { name: 'ESTAKA', lat: 8.583980702151859, lng: 123.34630121209919, ip: '192.168.0.162' },
  { name: 'GUEST HOUSE', lat: 8.579482721893665, lng: 123.35316154304115, ip: '192.168.5.153' },
  { name: 'PROVET', lat: 8.575566418877983, lng: 123.3618514834538, ip: '192.168.6.153' },
  { name: 'PDRRMO EVACUATION', lat: 8.58432964738279, lng: 123.34700569768796, ip: '192.168.7.153' },
  { name: 'OPAG MAIN', lat: 8.57728718968024, lng: 123.34113619695458, ip: '192.168.8.153' },
  { name: 'OPAG STA. ISABEL', lat: 8.572818956310224, lng: 123.36185616530166, ip: '192.168.9.153' },
  { name: 'ZNMC', lat: 8.605207762189488, lng: 123.34850150997994, ip: '192.168.10.153' },
  { name: 'OLD HOSPITAL', lat: 8.590692912524561, lng: 123.34276927766012, ip: '192.168.11.153' },
  { name: 'PEO-MAIN', lat: 8.547986345034818, lng: 123.36168331137628, ip: '192.168.12.153' },
  { name: 'PINAN DISTRICT HOSPITAL', lat: 8.487143470515987, lng: 123.4563892004368, ip: '192.168.13.153' },
  { name: 'MUTIA OPAG SUB STATION', lat: 8.420039740734314, lng: 123.47556957577122, ip: '192.168.14.153' },
  { name: 'LA LIBERTAD PEO SUB STATION', lat: 8.468537879641872, lng: 123.52624808838934, ip: '192.168.15.153' },
  { name: 'SIBUTAD MUNICIPAL HOSPITAL', lat: 8.620785623794871, lng: 123.47885629326504, ip: '192.168.16.153' },
  { name: 'SERGIO OSMENA INFIRMARY FACILITY', lat: 8.299880809752874, lng: 123.49410238846288, ip: '192.168.17.153' },
  { name: 'PROVET SUB STATION', lat: 8.520800283451338, lng: 123.23029652480675, ip: '192.168.18.153' },
  // { name: 'ROXAS OPAG SUB STATION', lat: 11.587431894043958, lng: 122.75544548474475, ip: '192.168.19.153' },
  { name: 'TRIFON SAILE MEMORIAL HOSPITAL', lat: 8.516891266403567, lng: 123.09189118354803, ip: '192.168.20.153' },
  { name: 'MANUKAN PEO SUB STATION', lat: 8.449072459097666, lng: 123.10358498784562, ip: '192.168.21.153' },
  { name: 'SINDANGAN DISTRICT HOSPITAL', lat: 8.2347125562087, lng: 122.99808582334492, ip: '192.168.22.153' },
  { name: 'SINDANGAN PEO SUB STATION', lat: 8.236832942007387, lng: 122.9982987057178, ip: '192.168.23.153' },
  { name: 'OPAG SUB STATION', lat: 8.236832942007387, lng: 122.9982987057178, ip: '192.168.24.153' },
  { name: 'LILOY INTEGRATED HEALTH DISTRICT HOSPITAL', lat: 8.122099803131272, lng: 122.6749325058121, ip: '192.168.25.153' },
  { name: 'LILOYPEO SUB STATION', lat: 8.077529413712195, lng: 122.57394954278578, ip: '192.168.26.153' },
  { name: 'OPAG SUB STATION', lat: 8.572776277526586, lng: 123.36184722376018, ip: '192.168.27.153' },
  { name: 'LABASON DISTRICT HOSPITAL', lat: 8.050123709543351, lng: 122.52720711701649, ip: '192.168.28.153' },
  { name: 'LABASON PEO SUB STATION', lat: 8.073739376868614, lng: 122.5731952251905, ip: '192.168.29.153' },
  { name: 'SIOCON PEO SUB STATION', lat: 7.71512866591944, lng: 122.13979769008971, ip: '192.168.31.153' },
  { name: 'SIBUCO MUNICIPAL HOSPITAL', lat: 7.289434850988555, lng: 122.06481059634902, ip: '192.168.32.153' }
];

const cctvIcon = L.icon({
    iconUrl: 'images/cctv-icon.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
});

// Create a LatLngBounds object
const bounds = L.latLngBounds([]);

cameras.forEach((camera) => {
    const marker = L.marker([camera.lat, camera.lng], { icon: cctvIcon }).addTo(map);
    marker.bindPopup(`
        <strong>${camera.name}</strong><br>
        <a href="http://${camera.ip}" target="_blank">${camera.ip}</a>
      `);
    marker.on('click', () => {
        cameraFeed.src = camera.ip;
    });

    // Add each camera's position to the bounds
    bounds.extend([camera.lat, camera.lng]);
});

// Fit the map to the bounds of all camera markers
map.fitBounds(bounds);

// Search functionality
document.getElementById('searchInput').addEventListener('input', e => {
  const val = e.target.value.trim().toLowerCase();
  const found = cameras.find(loc =>
    loc.name.toLowerCase().includes(val) ||
    loc.ip.includes(val) ||
    loc.lat.toString().includes(val) ||
    loc.lng.toString().includes(val)
  );
  if (found) {
    map.setView([found.lat, found.lng], 16);
    markers[found.name.toLowerCase()].openPopup();
    document.getElementById('videoBox').style.display = 'block';
    document.getElementById('liveVideo').src = "https://cdn.bloomberg.com/media-manifest/streams/euronews.m3u8";
  }
});

// Handle fullscreen toggling
// fullscreenIcon.addEventListener('click', () => {
//     if (!document.fullscreenElement) {
//       cameraBox.requestFullscreen().then(() => {
//         fullscreenIcon.innerHTML = '&#x1F5D6;'; // Exit icon 🗖
//         fullscreenIcon.classList.remove('centered');
//         fullscreenIcon.classList.add('bottom-right');
//       });
//     } else {
//       document.exitFullscreen().then(() => {
//         fullscreenIcon.innerHTML = '&#x26F6;'; // Enter icon ⛶
//         fullscreenIcon.classList.remove('bottom-right');
//         fullscreenIcon.classList.add('centered');
//       });
//     }
// });

// Reset icon when exiting fullscreen manually
// document.addEventListener('fullscreenchange', () => {
//   if (!document.fullscreenElement) {
//       fullscreenIcon.innerHTML = '&#x26F6;';
//       fullscreenIcon.classList.remove('bottom-right');
//       fullscreenIcon.classList.add('centered');
//   }
// });