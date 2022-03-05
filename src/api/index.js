import axios from 'axios'

// const claims = { headers: { Authorization: 'Bearer ' + setting.get('claims') } }
const basUrl = 'http://api.openweathermap.org/data/2.5'
export const GetTodayWeather = (params) => axios.get(`${basUrl}/weather?q=${params}&appid=f3b199a8fb0284f304461970150a4472`)