const weatherId = [
  // Thunderstorm
  { id: 200, main: "Thunderstorm", description: "thunderstorm with light rain", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 201, main: "Thunderstorm", description: "thunderstorm with rain", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 202, main: "Thunderstorm", description: "thunderstorm with heavy rain", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 210, main: "Thunderstorm", description: "light thunderstorm", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 211, main: "Thunderstorm", description: "thunderstorm", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 212, main: "Thunderstorm", description: "heavy thunderstorm", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 221, main: "Thunderstorm", description: "ragged thunderstorm", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 230, main: "Thunderstorm", description: "thunderstorm with light drizzle", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 231, main: "Thunderstorm", description: "thunderstorm with drizzle", URL: "https://openweathermap.org/img/wn/11d@2x.png" },
  { id: 232, main: "Thunderstorm", description: "thunderstorm with heavy drizzle", URL: "https://openweathermap.org/img/wn/11d@2x.png" },

  // Drizzle
  { id: 300, main: "Drizzle", description: "light intensity drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 301, main: "Drizzle", description: "drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 302, main: "Drizzle", description: "heavy intensity drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 310, main: "Drizzle", description: "light intensity drizzle rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 311, main: "Drizzle", description: "drizzle rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 312, main: "Drizzle", description: "heavy intensity drizzle rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 313, main: "Drizzle", description: "shower rain and drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 314, main: "Drizzle", description: "heavy shower rain and drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 321, main: "Drizzle", description: "shower drizzle", URL: "https://openweathermap.org/img/wn/09d@2x.png" },

  // Rain
  { id: 500, main: "Rain", description: "light rain", URL: "https://openweathermap.org/img/wn/10d@2x.png" },
  { id: 501, main: "Rain", description: "moderate rain", URL: "https://openweathermap.org/img/wn/10d@2x.png" },
  { id: 502, main: "Rain", description: "heavy intensity rain", URL: "https://openweathermap.org/img/wn/10d@2x.png" },
  { id: 503, main: "Rain", description: "very heavy rain", URL: "https://openweathermap.org/img/wn/10d@2x.png" },
  { id: 504, main: "Rain", description: "extreme rain", URL: "https://openweathermap.org/img/wn/10d@2x.png" },
  { id: 511, main: "Rain", description: "freezing rain", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 520, main: "Rain", description: "light intensity shower rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 521, main: "Rain", description: "shower rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 522, main: "Rain", description: "heavy intensity shower rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },
  { id: 531, main: "Rain", description: "ragged shower rain", URL: "https://openweathermap.org/img/wn/09d@2x.png" },

  // Snow
  { id: 600, main: "Snow", description: "light snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 601, main: "Snow", description: "snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 602, main: "Snow", description: "heavy snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 611, main: "Snow", description: "sleet", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 612, main: "Snow", description: "light shower sleet", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 613, main: "Snow", description: "shower sleet", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 615, main: "Snow", description: "light rain and snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 616, main: "Snow", description: "rain and snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 620, main: "Snow", description: "light shower snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 621, main: "Snow", description: "shower snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },
  { id: 622, main: "Snow", description: "heavy shower snow", URL: "https://openweathermap.org/img/wn/13d@2x.png" },

  // Atmosphere
  { id: 701, main: "Mist", description: "mist", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 711, main: "Smoke", description: "smoke", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 721, main: "Haze", description: "haze", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 731, main: "Dust", description: "sand/dust whirls", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 741, main: "Fog", description: "fog", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 751, main: "Sand", description: "sand", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 761, main: "Dust", description: "dust", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 762, main: "Ash", description: "volcanic ash", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 771, main: "Squall", description: "squalls", URL: "https://openweathermap.org/img/wn/50d@2x.png" },
  { id: 781, main: "Tornado", description: "tornado", URL: "https://openweathermap.org/img/wn/50d@2x.png" },

  // Clear
  { id: 800, main: "Clear", description: "clear sky", URL: "https://openweathermap.org/img/wn/01d@2x.png" },

  // Clouds
  { id: 801, main: "Clouds", description: "few clouds: 11-25%", URL: "https://openweathermap.org/img/wn/02d@2x.png" },
  { id: 802, main: "Clouds", description: "scattered clouds: 25-50%", URL: "https://openweathermap.org/img/wn/03d@2x.png" },
  { id: 803, main: "Clouds", description: "broken clouds: 51-84%", URL: "https://openweathermap.org/img/wn/04d@2x.png" },
  { id: 804, main: "Clouds", description: "overcast clouds: 85-100%", URL: "https://openweathermap.org/img/wn/04d@2x.png" }
];


export default weatherId;
