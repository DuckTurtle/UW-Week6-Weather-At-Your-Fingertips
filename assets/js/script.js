
var apiKey = "5282121f1a385049aa27e309e97fc347";
var city = document.querySelector('#cityTypeBox').value;
var searchBnt = $("#searchBnt");
var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&mode=xml";
var date = dayjs().format("DD/MM/YYYY");

//calls the weather api with given city.
async function getWeather (){
    var weatherAPI = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    await fetch(weatherAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
}
//sets all the text content for curent day weather
 async function setCurrentDay(){
    var data = await getWeather(city);
    console.log(data);
    var curentDayAnchor = $("#currentDay");
    var daytext = $("<h3>");
    daytext.addClass("");
    daytext.text(data.name + " (" + date + ") ");
    curentDayAnchor.append(daytext);

    var coolIcon = $("<i>");
    coolIcon.addClass("fas fa-" + data.weather.child.icon);
    curentDayAnchor.append(coolIcon);

    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.main.temp + "°F");
    curentDayAnchor.append(tempa);

    var windy = $("<p>");
    windy.addClass("");
    windy.text("Wind: " + data.wind.speed + " MPH");
    curentDayAnchor.append(windy);

    var water = $("<p>");
    water.addClass("");
    water.text("Humidity: " + data.main.humidity + "%");
    curentDayAnchor.append(water);

};




// event listoner that calls all the data when clicked.
searchBnt.on("click", function (event){
    event.preventDefault();
    city = document.querySelector('#cityTypeBox').value;
    if (!city){
        console.error("Please input a City");
        return;
    }
    //var setWeather = getWeather(city);
    //console.log(setWeather);
    setCurrentDay(city);
});
