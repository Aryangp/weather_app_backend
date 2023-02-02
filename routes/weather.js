const express = require("express");
const route = express.Router();
const axios = require("axios");
const countryData = require("../data");
require("dotenv").config();
//gets a paginated data
route.get("/weather/data", async (req, res) => {
  const weatherData = [];
const results = {};
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  console.log(page, limit)

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  for (let coun of countryData) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${coun.country},${coun.code}&appid=${process.env.API_KEY_WEATHER_APP}`;
    let cityData = await axios.get(url);
    weatherData.push(cityData.data);
    console.log("inside the loop")
  }
  console.log("outside the loop");
  if (endIndex < weatherData.length) {
    results.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
    };
  }
  results.result = weatherData.slice(startIndex, endIndex);
  res.json(results);
});

//to get data of specific country weather which is random
route.get("/weather/specificCity",async (req,res)=>{
const index=Math.round((Math.random()*100)%countryData.length);
const url = `http://api.openweathermap.org/data/2.5/weather?q=${countryData[index].country},${countryData[index].code}&appid=${process.env.API_KEY_WEATHER_APP}`;
const result = await axios.get(url);
res.json(result.data);

})

module.exports = route;
