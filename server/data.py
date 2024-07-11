
import pandas as pd

def load_preprocess_sales_dataset():

    df = pd.read_csv("store_sales.csv", encoding='latin1', parse_dates=['Order Date'])
    df.isnull().any()

    sales_data = df[['Order Date','Sales']] 
    sales_data = pd.DataFrame(sales_data) 

    sales_data['Sales'] = sales_data['Sales'].dropna()
    sales_data['Order Date'] = pd.to_datetime(sales_data['Order Date'])

    return sales_data


def return_monthly_sales(sales_data):
    monthly_sales = sales_data.resample('ME', on='Order Date')['Sales'].sum()
    return monthly_sales