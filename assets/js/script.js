
var apiKey = "5282121f1a385049aa27e309e97fc347";
var city = document.querySelector('#cityTypeBox').value;
var searchBnt = $("#searchBnt");
var weatherAPIBase = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&mode=xml";
var date = dayjs().format("MM/DD/YYYY");
var runs = 0;
var historySearch = document.querySelector("#weathertext");
//calls the weather api with given city.
async function getWeather (){
    var weatherAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    let dataResults = fetch(weatherAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//calls the forcast and waits to pass it on till the api responds.
async function getOtherDayWeather (){
    var forcastAPI = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey + "&units=imperial";
    let dataResults = fetch(forcastAPI)
    .then(function(response){
        var results = response.json();
        console.log(results);
            return results;
        });
        let data = await dataResults;
        return data;
}
//sets all the text content for curent day weather
 async function setCurrentDay(){
    var data = await getWeather(city);
    console.log(data);
    // checks for valid data
    if (!data){
        console.error("Please input a City");
        return;
    }
    //creates element for location and date
    var curentDayAnchor = $("#currentDay");
    var daytext = $("<h3>");
    daytext.addClass("");
    daytext.text(data.name + " (" + date + ") ");
    curentDayAnchor.append(daytext);
    // adds weather img
    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png");
    curentDayAnchor.append(coolIcon);
//  adds tempature element at text
    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.main.temp + "°F");
    curentDayAnchor.append(tempa);
// above but for wind
    var windy = $("<p>");
    windy.addClass("");
    windy.text("Wind: " + data.wind.speed + " MPH");
    curentDayAnchor.append(windy);
// above also but for humidaty
    var water = $("<p>");
    water.addClass("");
    water.text("Humidity: " + data.main.humidity + "%");
    curentDayAnchor.append(water);

};
// sets text values for forcast blocks. does same stuff as the one above but for the forcast
async function otherDayForcast(){
    var data = await getOtherDayWeather(city);
    console.log(data);
    if (!data){
        console.error("Please input a City");
        return;
    }
    var forcatDayAnchor = $("#5dayforcast");
    for(i=4; i<40; i+=8){
    var blockbox = $("<div>");
    blockbox.addClass("weatherBlock");
    forcatDayAnchor.append(blockbox)

    var daytext = $("<h4>");
    daytext.addClass("");
    var dateCovert = dayjs(data.list[i].dt_txt).format("MM/DD/YYYY")
    daytext.text(data.city.name + " (" + dateCovert + ") ");
    blockbox.append(daytext);

    var coolIcon = $("<img>");
    coolIcon.attr("src", "https://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png");
    blockbox.append(coolIcon);

    var tempa = $("<p>");
    tempa.addClass("");
    tempa.text("Temp: " + data.list[i].main.temp + "°F");
    blockbox.append(tempa);

    var windy = $("<p>");
    windy.addClass("");
    windy.text("Wind: " + data.list[i].wind.speed + " MPH");
    blockbox.append(windy);

    var water = $("<p>");
    water.addClass("");
    water.text("Humidity: " + data.list[i].main.humidity + "%");
    blockbox.append(water);
    }
};
// clears old weather text
function clearOldStuff(){
    var curentday = document.getElementById("currentDay");
    console.log(curentday);
    while (curentday.firstChild) {
        curentday.removeChild(curentday.firstChild);
      }
    
    var c5day = document.getElementById("5dayforcast");
    while (c5day.firstChild) {
        c5day.removeChild(c5day.firstChild);
      }
};
//creates a button for the history
function createPastButton(){ 
    var oldSearchBnt = document.createElement ("button");
    oldSearchBnt.setAttribute("aria-label", "history");
    oldSearchBnt.textContent=city;
    historySearch.appendChild(oldSearchBnt);
    //adds event listener for the old buttons
    oldSearchBnt.addEventListener("click", function (){
        city = oldSearchBnt.textContent;
        if( runs >= 1){
            clearOldStuff();
            }
            runs++
        setCurrentDay(city);
        otherDayForcast(city);
    })
};
function clearTextBox(){
 var inputBox = $("#cityTypeBox");
 inputBox.val("");
// clears the input box
}


// event listoner that calls all the data when clicked.
searchBnt.on("click", function (event){
    event.preventDefault();
    city = document.querySelector('#cityTypeBox').value;
    if( runs >= 1){
    clearOldStuff();
    }
    setCurrentDay(city);
    otherDayForcast(city);
    createPastButton(city);
     clearTextBox();
    runs++
});

