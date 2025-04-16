// ----------------- Weather Script ------------------

const apiKey = '4e6436b51e2e13bf4e1a124f41412b15'; //OpenWeatherMap API key
const lat = '8.5839362'; // latitude
const lon = '123.3460695'; // longitude
const units = 'metric';

fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`)
  .then(response => response.json())
  .then(data => {
    const location = data.name;
    const temp = Math.round(data.main.temp);
    document.getElementById('weather-location').textContent = location;
    document.getElementById('weather-temp').textContent = `${temp}°C`;
  })
  .catch(error => {
    document.getElementById('weather-location').textContent = 'Unavailable';
    console.error('Weather API error:', error);
  });

// Hover logic
const weatherBtn = document.getElementById('weather-button');
const weatherLabel = document.getElementById('weather-label');
const weatherInfo = document.getElementById('weather-info');

weatherBtn.addEventListener('mouseenter', () => {
    weatherLabel.classList.add('fade-out');
    weatherInfo.classList.add('fade-in');
});

weatherBtn.addEventListener('mouseleave', () => {
    weatherLabel.classList.remove('fade-out');
    weatherInfo.classList.remove('fade-in');
});


// ----------------- Calendar Script -----------------

document.addEventListener('DOMContentLoaded', () => {
  const calendarContainer = document.getElementById('calendar-widget');
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  let html = `<div class="calendar-header">${monthNames[month]} ${year}</div>`;
  html += `<div class="calendar-grid">`;

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days.forEach(day => {
    html += `<div class="calendar-day-name">${day}</div>`;
  });

  for (let i = 0; i < firstDay; i++) {
    html += `<div class="calendar-day empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const isToday = day === today ? 'today' : '';
    html += `<div class="calendar-day ${isToday}">${day}</div>`;
  }

  html += `</div>`;
  calendarContainer.innerHTML = html;
});


// ------------------ Map Script ------------------

document.addEventListener('DOMContentLoaded', () => {
  const map = L.map('map-container').setView([8.5839362, 123.3460695], 13); // Sample coordinates

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  L.marker([8.5839362, 123.3460695]).addTo(map)
    .openPopup();
});