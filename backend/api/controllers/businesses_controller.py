from api.helpers.utils.fetch import fetchData
from api.machine_learning.core.models.topic_modeling.preprocess import preprocess_topics
from api.machine_learning.core.models.business_prediction.prediction import predict_business_success
from api.machine_learning.core.models.business_prediction.preprocess import preprocess_data
from api.machine_learning.core.models.topic_modeling.prediction import classify_data_top2_category
from api.machine_learning.utils.data_cleaning.preprocess import split_attribute_to_2d_array
from api.machine_learning.core.models.business_recommendations.prediction import get_business_types_by_category,get_popular_businesses_by_category
import json
import os



BASE_URL = 'https://api.yelp.com/v3/businesses/'
API_KEY =os.getenv('YELP_API_KEY')

HEADERS = {'Authorization': 'Bearer ' + API_KEY}


# @route: /businesses/search

def getBusinesses(query):

    url = BASE_URL + 'search{}'.format(query)
    response = fetchData(url, HEADERS)
    return response


# @route: /businesses/{id}/reviews

def getReviews(business_id,query):
    url = BASE_URL + '{}/reviews{}'.format(business_id,query)
    
    response = fetchData(url,HEADERS)
    return response



# @route: /businesses/predictions/topics

def getTopics(reviews):
    key='text'
    reviews = split_attribute_to_2d_array(reviews,key)
    data = preprocess_topics(reviews)
    results = classify_data_top2_category(data,reviews)
    response = {'reviews':results}
    return json.dumps(response)

# @route: /businesses/recommendations/categories

def getRecommendationsByCategories(category):

    top_related_categories =  get_business_types_by_category(category)
    response = {'categories':top_related_categories,'status':200}
    return json.dumps(response)

# @route: /businesses/recommendations/popular

def getRecommendationsByPopularity(category):
    popular_businesses = get_popular_businesses_by_category(category)
    response = {'businesses':popular_businesses,'status':200}
    return json.dumps(response)

# @route: /businesses/predictions/business-success

def getPredictions(reviews):
    key='text'
    texts = split_attribute_to_2d_array(reviews,key)
    key='rating'
    ratings = split_attribute_to_2d_array(reviews,key)
    data = [texts,ratings]
    data = preprocess_data(data)
    result = predict_business_success(data)
    response = {'successful':result,'status':200}
    return json.dumps(response)
