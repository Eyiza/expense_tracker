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
    url = 'https://api.exchangerate.host/convert'
    params = {
        'from': from_currency,
        'to': to_currency,
    }
    response = requests.get(url, params=params)
    # print(response)
    # print("Request URL:", response.url)
    if response.ok:
        data = response.json()
        conversion_rate = Decimal(data['result'])
        # conversion_rate = Decimal(str(data['result']))
        converted_amount = amount * conversion_rate
        return round(converted_amount, 2)
    return None