import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from joblib import load
from data import load_preprocess_sales_dataset, return_monthly_sales

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
    forecast_series = forecast_series.dropna()

    return forecast_series, monthly_sales


@app.route("/fetch/forecast/sales")
def fetch_forecast_sales():    
    forecast_periods = request.args.get('forecast_periods', type=int)
    forecast_series, monthly_sales = load_model_and_forecast(forecast_periods)

    historical_data = [{'date': date.strftime('%Y-%m-%d'), 'sales': sales} for date, sales in zip(monthly_sales.index, monthly_sales.values)]
    forecast_data = [{'date': date.strftime('%Y-%m-%d'), 'sales': sales} for date, sales in zip(forecast_series.index, forecast_series.values)]

    all_sales_data = {
        'historical_data': historical_data,
        'forecast_data': forecast_data
    }

    return jsonify(all_sales_data), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=9090, debug=True)
