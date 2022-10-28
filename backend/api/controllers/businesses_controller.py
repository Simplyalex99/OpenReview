from api.helpers.utils.fetch import fetchData
import os

BASE_URL = 'https://api.yelp.com/v3/businesses/search'
API_KEY = os.environ.get('YELP_API_KEY')
HEADERS = {'Authorization': 'Bearer ' + API_KEY}


# @route: /businesses/search

def getBusinesses(query):

    url = BASE_URL + 'search{}'.format(query)
    response = fetchData(url, HEADERS)
    return response


# @route: /businesses/{id}

def getBusinessById(businessId):
    pass


# @route: /businesses/{id}/reviews

def getReviews(business):
    pass
