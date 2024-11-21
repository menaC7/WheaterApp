
import convertFahrenToCelsius from "./modules/convert.js"

const key = 'EM3F45MJ2U4P4TMSAZ3P6GJMB'

async function getDataFromAPI(city) {
    const link = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${key}`

    try {
        const response = await fetch(link, {
            mode: 'cors'
        })

        const data = response.json()
        return data
    } catch (err) {
        console.log(err)
    }

}

async function receiveData() {
    const data = await getDataFromAPI(search.value)

    return ({
        cityaddress: data.resolvedAddress,
        timezone: data.timezone,
        temp: data.currentConditions.temp,
        feelslike: data.currentConditions.feelslike,
        wind: data.currentConditions.windspeed,
        humidity: data.currentConditions.humidity,
        datetime: data.currentConditions.datetime,
        icon: data.currentConditions.icon,
        conditions: data.currentConditions.conditions,
        days: data.days
    })
}

class Create {

    constructor(date, icon, max, min) {
        this.date = date,
        this.icon = icon,
        this.max = max,
        this.min = min
    }

}

async function show() {
    const data = await receiveData()

    city_address.textContent = data.cityaddress
    update_time.textContent = `Updated at ${data.datetime}`
    weather_icon.src = `./imgs/icons/${data.icon}.svg`
    current_temp.textContent = `${convertFahrenToCelsius(data.temp)}°`
    temp_max.textContent = `∧ ${convertFahrenToCelsius(data.days[0].tempmax)}°`
    temp_min.textContent = `∨ ${convertFahrenToCelsius(data.days[0].tempmin)}°`

    fahren_btn.addEventListener('click', () => {
        current_temp.textContent = `${Math.floor(data.temp)}°`
        temp_max.textContent = `∧ ${Math.floor(data.days[0].tempmax)}°`
        temp_min.textContent = `∨ ${Math.floor(data.days[0].tempmin)}°`
    })
    celsius_btn.addEventListener('click', () => {
        current_temp.textContent = `${convertFahrenToCelsius(data.temp)}°`
        temp_max.textContent = `∧ ${convertFahrenToCelsius(data.days[0].tempmax)}°`
        temp_min.textContent = `∨ ${convertFahrenToCelsius(data.days[0].tempmin)}°`
    })

    wind_speed.textContent = `Wind: ${data.wind} MPH`
    air_humidity.textContent = `Humidity: ${data.humidity}%`
    current_conditions.textContent = data.conditions
    local_date.textContent = data.days[0].datetime

    weeks_container.textContent = null
    const array = []
    CreateWeek(data.days, array)
}

const search = document.querySelector('#search')
search.addEventListener('input', show) // *


const city_address = document.querySelector('#city-address')
const update_time = document.querySelector('#update-time')
const weather_icon = document.querySelector('#weather-icon')
const current_temp = document.querySelector('#current-temp')
const temp_max = document.querySelector('#temp-max')
const temp_min = document.querySelector('#temp-min')
const fahren_btn = document.querySelector('#fahren-btn')
const celsius_btn = document.querySelector('#celsius-btn')
const wind_speed = document.querySelector('#wind-speed')
const air_humidity = document.querySelector('#humidity')
const current_conditions = document.querySelector('#current-conditions')
const local_date = document.querySelector('#local-date')

const weeks_container = document.querySelector('.next-weeks-weather')

function CreateWeek(data, array) {
    data.forEach(day => {
        const createDay = new Create(day.datetime, day.icon, day.tempmax, day.tempmin)

        array.push(createDay)
    })

    for (let i = 0; i <= array.length; i++) {
        const div = document.createElement('div')
        const date = document.createElement('p')
        date.textContent = `${array[i].date}`
        const icon = document.createElement('img')
        icon.src = `./imgs/icons/${array[i].icon}.svg`
        const tempmax = document.createElement('p')
        tempmax.textContent = `${convertFahrenToCelsius(array[i].max)}°`
        const tempmin = document.createElement('p')
        tempmin.textContent = `${convertFahrenToCelsius(array[i].min)}°`

        fahren_btn.addEventListener('click', () => {
            tempmax.textContent = `${Math.floor(array[i].max)}°`
            tempmin.textContent = `${Math.floor(array[i].min)}°`
        })
        celsius_btn.addEventListener('click', () => {
            tempmax.textContent = `${convertFahrenToCelsius(array[i].max)}°`
            tempmin.textContent = `${convertFahrenToCelsius(array[i].min)}°`
        })
    
        div.append(date, icon, tempmax, tempmin)
        weeks_container.appendChild(div)
    }
}
show()
