import axios, { AxiosResponse } from 'axios'

export const getForeCastData = (forecastPeriods: number): Promise<AxiosResponse<any, any>> => {
    return axios.get(`http://localhost:9090/fetch/forecast/sales?forecast_periods=${forecastPeriods}`);
}

