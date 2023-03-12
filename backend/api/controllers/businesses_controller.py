from api.helpers.utils.fetch import fetchData
from api.machine_learning.core.models.topic_modeling.preprocess import preprocess_topics
from api.machine_learning.core.models.business_prediction.prediction import (
    predict_business_success,
)
from api.machine_learning.core.models.business_prediction.preprocess import (
    preprocess_data,
)
from api.machine_learning.core.models.topic_modeling.prediction import (
    classify_data_top2_category,
)
from api.machine_learning.utils.data_cleaning.preprocess import (
    split_attribute_to_2d_array,
)
from api.machine_learning.core.models.business_recommendations.prediction import (
    get_business_types_by_category,
    get_popular_businesses_by_category,
)
from api.errors.templates.api_error import APIError
from api.errors.templates.invalid_input_error import InvalidInputError
from api.errors.templates.service_unavailable_error import ServiceUnavailableError
from api.helpers.utils.query_builder import queryBuilder
from flask import request
import json
import os

BASE_URL = 'https://api.yelp.com/v3/businesses/'
API_KEY =os.getenv('YELP_API_KEY')
HEADERS = {'Authorization': 'Bearer ' + API_KEY}


# @route: /businesses/search

def getBusinesses(query):

    url = BASE_URL + 'search{}'.format(query)
    response = fetchData(url, HEADERS)
    if response== None:
        raise APIError()
    return response


# @route: /businesses/{id}/reviews

def getReviews(id):
    keys = ("locale","offset","limit","sort_by")
    params = {key: request.args.get(key) for key in keys}
    query= queryBuilder(params)
    url = BASE_URL + '{}/reviews{}'.format(id,query)
    response = fetchData(url,HEADERS)
    if response== None:
        raise APIError()
    return response



# @route: /businesses/predictions/topics

def getTopics(id):
    data=request.get_json()
    key_text = 'text'
    key_reviews = 'reviews'
    if key_reviews not in data:
        raise InvalidInputError()
    reviews = data['reviews']
    try:
        reviews = split_attribute_to_2d_array(reviews,key_text)
        data = preprocess_topics(reviews)
        results = classify_data_top2_category(data,reviews)
        response = {'reviews':results,'status':200}
        return json.dumps(response)
    except:
        raise InvalidInputError()


# @route: /businesses/recommendations/categories

def getRecommendationsByCategories():
    category = request.args.get("category")
    if category == None:
        error_message = "mandatory 'category' query is missing from the URL"
        raise InvalidInputError(description=error_message)
    top_related_categories =  get_business_types_by_category(category)
    response = {'categories':top_related_categories,'status':200}
    return json.dumps(response)

# @route: /businesses/recommendations/popular

def getRecommendationsByPopularity():
    category = request.args.get("category")
    if category == None:
        error_message = "mandatory 'category' query is missing from the URL"
        raise InvalidInputError(description=error_message)
    popular_businesses = get_popular_businesses_by_category(category)
    response = {'businesses':popular_businesses,'status':200}
    return json.dumps(response)

# @route: /businesses/predictions/business-success

def getPredictions(id):
    data=request.get_json()
    key_text = 'text'
    key_rating = 'rating'
    key_reviews = 'reviews'
    if key_reviews not in data:
        raise InvalidInputError()
    reviews = data['reviews']
    try:
        texts = split_attribute_to_2d_array(reviews,key_text)
        ratings = split_attribute_to_2d_array(reviews,key_rating)
        data = [texts,ratings]
        data = preprocess_data(data)
        is_successful,total_positive_score,total_negative_score  = predict_business_success(data)
        response = {'successful':is_successful,'positiveReviews':total_positive_score,'negativeReviews':total_negative_score,'status':200}
        return json.dumps(response)
    except:
        raise InvalidInputError()

