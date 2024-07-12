import axios, { AxiosResponse } from 'axios'

export const getForeCastData = (forecastPeriods: number): Promise<AxiosResponse<any, any>> => {
    return axios.get(`https://smartsales-smartsales.onrender.com/fetch/forecast/sales?forecast_periods=${forecastPeriods}`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

