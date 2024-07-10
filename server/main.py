import pandas as pd

from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from train import load_preprocess_sales_dataset, return_monthly_sales


app = Flask(__name__)
CORS(app)

def load_model_and_forecast(forecast_periods):
    with open('sarima_model.joblib', 'rb') as model:
        results = load(model)

    sales_data = load_preprocess_sales_dataset()
    monthly_sales = return_monthly_sales(sales_data)
    
    forecast = results.get_forecast(steps=forecast_periods)
    forecast_mean = forecast.predicted_mean

    forecast_index = pd.date_range(start=monthly_sales.index[-1], periods=forecast_periods, freq='ME')
    forecast_series = pd.Series(forecast_mean, index=forecast_index)

    return forecast_series

@app.get("/fetch/forecast/sales")
def fetch_forecast_sales():    

    forecast_periods = request.args.get('forecast_periods', default=24, type=int)
    forecast_series = load_model_and_forecast(forecast_periods)

    forecast_data = forecast_series.to_dict()

    return jsonify(forecast_data)




if __name__ == '__main__':
    app.run(port=9090, debug=True)