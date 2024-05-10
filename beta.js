alert("Chào bạn, rất vui khi đã sử dụng web lỏ của mình <3\nHiện tại đang còn sơ sài rất nhiều mong thấu hiểu và thông cảm cho mình :<\n\nKi's Ten's: KimiZK - Ng.X.XXX")

// Chặn người dùng sử dụng chuột phải
document.oncontextmenu = function () {
  return false;
};

// Cập nhật thời gian thực ở Việt Nam
function updateRealTime() {
  var date = new Date();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();

  if (hours < 10) {
    hours = "0" + hours;
  }

  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  var time = hours + " : " + minutes + " : " + seconds;

  document.getElementById("real-time").innerText = time;
}
setInterval(updateRealTime, 1000);

// Get data API
const weather = {
  apiKey: "09badd72d8a14e1cb0c85629231109",
  getDataAPI: function (location) {
    axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${this.apiKey}&q=${location}&lang=vi`)
      .then((res) => {
        const currentweather = res.data.current;
        const infolocation = res.data.location;
        const forecast = res.data.forecast.forecastday[0].astro;

        document.querySelector(".location").innerText = infolocation.name;
        document.querySelector(".last-updated").innerText = currentweather.last_updated;
        document.querySelector(".icon").src = currentweather.condition.icon;
        document.querySelector(".result-temp").innerText = `${currentweather.temp_c}°C`;
        document.querySelector(".country").innerText = infolocation.country;
        document.querySelector(".lat-lon").innerText = `${infolocation.lat}°, ${infolocation.lon}°`;
        document.querySelector(".gust-kph").innerText = `${currentweather.gust_kph} km/h`;
        document.querySelector(".feelslike").innerText = `${currentweather.feelslike_c}°c`;
        document.querySelector(".current-weather").innerText = `${currentweather.condition.text}`;
        document.querySelector(".wind-speed").innerText = `${currentweather.wind_kph} km/h`;
        document.querySelector(".value-humidity").innerText = `${currentweather.humidity}%`;
        document.querySelector(".value-uv").innerText = `${currentweather.uv}`;
        document.querySelector(".sunrise").innerText = forecast.sunrise;
        document.querySelector(".moonrise").innerText = forecast.moonset;
        document.querySelector(".sunset").innerText = forecast.sunset;
        document.querySelector(".moonset").innerText = forecast.moonrise;
        document.querySelector(".err").innerText = "Check search location ....";
      })

      .catch((err) => {
        document.querySelector(".err").innerText = "Location is undified";
        alert(`Thông Báo: Địa điểm đó không tồn tại hoặc cơ sở dữ liệu không có dữ liệu ở nơi đó!`);
      });
      
  },
  search: function () {
    const data = document.querySelector(".seacrh-btn");
    const getData = data.value;
    this.getDataAPI(getData);
  }
};

// Nhấn nút tìm kiếm sẽ gửi yêu cầu về weather.search() để thực hiện tìm kiếm nơi khác
document.querySelector(".search button").addEventListener("click", function () {
  weather.search();
});

// Nhấn nút ENTER trên bàn phím sẽ gửi yêu cầu về weather.search() để thực hiện tìm kiếm nơi khác
document.querySelector(".seacrh-btn").addEventListener("keyup", function (event) {
  if (event.key == "Enter") {
    weather.search();
  }
});

// Địa điểm định sẵn trước khi vào web
weather.getDataAPI("ha noi");