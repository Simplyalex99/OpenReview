from flask import request
from api.controllers.businesses_controller import getBusinesses, getReviews, getTopics, getRecommendationsByCategories,getRecommendationsByPopularity, getPredictions


from api.helpers.utils.query_builder import queryBuilder
from api import app

@app.route("/businesses/search", methods=["GET"])
def index():
    keys = (
        "term",
        "location",
        "latitude",
        "longitude",
        "radius",
        "limit",
        "sort_by",
        "open_at",
    )
    params = {key: request.args.get(key) for key in keys}
    query = queryBuilder(params)
    return getBusinesses(query)
@app.route("/businesses/<id>/reviews",methods=["GET"])
def reviews_route(id):
    #business_id=request.args.get("id")
    business_id=id
    keys = ("locale","offset","limit","sort_by")
    params = {key: request.args.get(key) for key in keys}
    query= queryBuilder(params)
    return getReviews(business_id,query)



@app.route("/businesses/predictions/topics", methods=["POST"])
def topics_route():
    data=request.get_json()
    reviews = data['reviews']
    return getTopics(reviews)
   
@app.route("/businesses/recommendations/popular", methods=["GET"])
def recommendations_popular_route():
    category = request.args.get("category")
    return getRecommendationsByPopularity(category)

@app.route("/businesses/recommendations/categories", methods=["GET"])
def recommendations_categories_route():
    category = request.args.get("category")  
    return getRecommendationsByCategories(category)

@app.route("/businesses/predictions/business-success", methods=["POST"])
def predictions_route():
    data=request.get_json()
    reviews = data['reviews']
    return getPredictions(reviews)
