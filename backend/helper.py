import os
import requests
from babel.numbers import get_currency_symbol
from decimal import Decimal

def currency_symbol(currency_code):
    if currency_code == 'NGN':
        locale = 'en_NG'
        return get_currency_symbol('NGN', locale=locale)
    return get_currency_symbol(currency_code)


def convert_currency(amount, from_currency, to_currency):
    # url = 'https://cdn.moneyconvert.net/api/latest.json'    
    # payload = {
    #     'from': from_currency,
    #     'to': to_currency,
    # } 

    url = f"https://api.apilayer.com/fixer/convert?to={to_currency}&from={from_currency}&amount={amount}" 
    payload = {}
    headers = {
        "apikey": os.environ.get("API_KEY")
    }
    response = requests.get(url, headers=headers, data = payload)
    # print("Request URL:", response.url)
    if response.ok:
        data = response.json()
        # conversion_rate = Decimal(data['result'])
        # conversion_rate = Decimal(str(data['result']))
        # converted_amount = amount * conversion_rate

        converted_amount = Decimal(data['result'])
        return round(converted_amount, 2)
    return None