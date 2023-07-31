import os
import requests
from babel.numbers import format_currency

def format_currency(amount, currency_code):
    formatted_amount = format_currency(amount, currency_code)
    return formatted_amount


def convert_currency(amount, from_currency, to_currency):
    url = 'https://api.exchangerate.host/convert'
    params = {
        'from': from_currency,
        'to': to_currency,
    }
    response = requests.get(url, params=params)
    print(response)
    print("Request URL:", response.url)
    if response.ok:
        data = response.json()
        conversion_rate = data['result']
        converted_amount = amount * conversion_rate
        return round(converted_amount, 2)
    return None