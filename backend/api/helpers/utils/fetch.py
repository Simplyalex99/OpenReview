import requests


def fetchData(url, headers={}):
    response = None
    try:
        response = requests.get(url, headers=headers)
        print(response)
        return response.json()
    except Exception as e:
        print(e)

    return response
