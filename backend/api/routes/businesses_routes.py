from api.controllers.businesses_controller import (
    getBusinesses,
    getReviews,
    getTopics,
    getRecommendationsByCategories,
    getRecommendationsByPopularity,
    getPredictions,
)
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
    return getReviews(id)



@app.route("/businesses/<id>/topics", methods=["POST"])
def topics_route(id):
    return getTopics(id)
   
@app.route("/businesses/recommendations/popular", methods=["GET"])
def recommendations_popular_route():
    return getRecommendationsByPopularity()

@app.route("/businesses/recommendations/categories", methods=["GET"])
def recommendations_categories_route():
    return getRecommendationsByCategories()

@app.route("/businesses/<id>/business-success", methods=["POST"])
def predictions_route(id):
    return getPredictions(id)
