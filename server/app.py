import itertools

import pandas as pd 
import matplotlib.pyplot as plt
from statsmodels.tsa.statespace.sarimax import SARIMAX

from statsmodels.tsa.stattools import adfuller
from statsmodels.tsa.seasonal import seasonal_decompose
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf 
from sklearn.metrics import mean_absolute_error, mean_squared_error 

forecast_periods = 24

def find_best_sarima_parameters(data):
    p = d = q = range(0, 2)
    pdq = list(itertools.product(p, d, q))
    seasonal_pdq = [(x[0], x[1], x[2], 12) for x in pdq]

    min_aic = float('inf')
    best_params = None

    for param in pdq:
        for param_seasonal in seasonal_pdq:

            try:
                mod = SARIMAX(data, order=param, seasonal_order=param_seasonal)
                results = mod.fit()

                if results.aic < min_aic:
                    min_aic = results.aic
                    best_params = (param, param_seasonal)

            except:
                continue

    print('Best SARIMA parameters:', best_params)

def set_sarima_parameters():
    p, d, q = 0, 1, 1
    P, D, Q, s = 0, 1, 1, 12

    order = (p, d, q)
    seasonal_order = (P, D, Q, s)

    return order, seasonal_order


def load_preprocess_sales_dataset():

    df = pd.read_csv("store_sales.csv", encoding='latin1', parse_dates=['Order Date'])
    df.isnull().any()

    sales_data = df[['Order Date','Sales']] 
    sales_data = pd.DataFrame(sales_data) 

    sales_data['Sales'] = sales_data['Sales'].dropna()
    sales_data['Order Date'] = pd.to_datetime(sales_data['Order Date'])
    print("sales_data.head(): ", sales_data.head())

    return sales_data


def plot_return_monthly_sales(sales_data):

    monthly_sales = sales_data.resample('ME', on='Order Date')['Sales'].sum()

    plt.figure(figsize=(12, 6))
    plt.plot(monthly_sales)
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.title('Monthly Sales')
    plt.show()

    print("monthly_sales.head(): ", monthly_sales.head())
    return monthly_sales


def decompose_timeseries(timeseries):
    decomposition = seasonal_decompose(timeseries, model='additive')
    decomposition.plot()
    plt.show()


# testing if the data is seasonal non-stationary if stationary meaning it is valid 
# for sarima model forecasting
def test_stationarity(timeseries):
    rolmean = timeseries.rolling(window=forecast_periods).mean() 
    rolstd = timeseries.rolling(window=forecast_periods).std()  

    plt.figure(figsize=(10, 6))
    plt.plot(timeseries, color='blue', label='Original')
    plt.plot(rolmean, color='red', label='Rolling Mean')
    plt.plot(rolstd, color='black', label='Rolling Std')
    plt.legend(loc='best')
    plt.title('Rolling Mean & Standard Deviation')
    plt.show()

    print('Results of Dickey-Fuller Test:')
    dftest = adfuller(timeseries, autolag='AIC')
    dfoutput = pd.Series(dftest[0:4], index=['Test Statistic', 'p-value', '#Lags Used', 'Number of Observations Used'])
    for key, value in dftest[4].items():
        dfoutput['Critical Value (%s)' % key] = value
    print(dfoutput)

    p_value =       dfoutput['p-value']
    test_static =   dfoutput['Test Statistic']

    critical_values = [
        dfoutput['Critical Value (1%)'], 
        dfoutput['Critical Value (5%)'], 
        dfoutput['Critical Value (10%)']
    ]

    for val in critical_values:
       return 'stationary' if (test_static < val) and p_value < 0.05 else 'non-stationary'

    return None


def plot_acf_pacf(monthly_sales):
    plot_acf(monthly_sales) 
    plot_pacf(monthly_sales) 
    plt.show()


def sarima_model(monthly_sales):
    order, seasonal_order = set_sarima_parameters()

    try:
        model = SARIMAX(monthly_sales, order=order, seasonal_order=seasonal_order)
        results = model.fit()

        # Ensure the model has successfully converged before plotting diagnostics
        if results.mle_retvals['converged']:
            results.plot_diagnostics(figsize=(15, 10))
            plt.show()
        else:
            print("Model did not converge.")

        return results

    except Exception as e:
        print(f"Error occurred: {e}")
        return None


def get_forecast_series(results, monthly_sales):

    forecast = results.get_forecast(steps=forecast_periods)
    forecast_mean = forecast.predicted_mean

    forecast_index = pd.date_range(start=monthly_sales.index[-1], periods=forecast_periods, freq='ME')
    forecast_series = pd.Series(forecast_mean, index=forecast_index)

    return forecast_mean, forecast_series


def plot_forecast_series(monthly_sales, forecast_series):
    plt.figure(figsize=(10, 5))
    plt.plot(monthly_sales, label='Observed')
    plt.plot(forecast_series, label='Forecast', color='red')
    plt.xlabel('Date')
    plt.ylabel('Sales')
    plt.title('Sales Forecast')
    plt.legend()
    plt.show()


def evaluate_sarima_model(forecast_mean, monthly_sales):
    observed = monthly_sales[-forecast_periods:]
    mae = mean_absolute_error(observed, forecast_mean) 
    mse = mean_squared_error(observed, forecast_mean) 

    print(f'MAE: {mae}') 
    print(f'MSE: {mse}')



sales_data = load_preprocess_sales_dataset()
monthly_sales = plot_return_monthly_sales(sales_data)
test_result = test_stationarity(monthly_sales)

# find_best_sarima_parameters(monthly_sales)


# try to spot and remove outliers unya hahaha
if test_result == 'stationary':
    plot_acf_pacf(monthly_sales)
    decompose_timeseries(monthly_sales)
    results = sarima_model(monthly_sales)

    if results is not None:
        forecast_mean, forecast_series = get_forecast_series(results, monthly_sales)
        plot_forecast_series(monthly_sales, forecast_series)
        evaluate_sarima_model(forecast_mean, monthly_sales)



