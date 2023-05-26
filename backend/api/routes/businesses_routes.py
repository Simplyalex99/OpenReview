from api.controllers.businesses_controller import (
    getBusinesses,
    getReviews,
    getTopics,
    getRecommendationsByCategories,
    getRecommendationsByPopularity,
    getPredictions,
    getAutocomplete
)
from run import (app,cache)

@app.route("/businesses/autocomplete",methods=["GET"])
@cache.cached(timeout=30,query_string=True)
def autocomplete_route():
    return getAutocomplete()

@app.route("/businesses/search", methods=["GET"])
@cache.cached(timeout=300, query_string=True)
def index():
    return getBusinesses()
    
@app.route("/businesses/<id>/reviews",methods=["GET"])
@cache.cached(timeout=300, query_string=True)
def reviews_route(id):
    print(id)
    return getReviews(id)



@app.route("/businesses/predictions/topics", methods=["POST"])
@cache.cached(timeout=300)
def topics_route():
    return getTopics()

 
@app.route("/businesses/recommendations/popular", methods=["GET"])
@cache.cached(timeout=300, query_string=True)  
def recommendations_popular_route():
    return getRecommendationsByPopularity()


@app.route("/businesses/recommendations/categories", methods=["GET"])
@cache.cached(timeout=300, query_string=True)
def recommendations_categories_route():
    return getRecommendationsByCategories()


@app.route("/businesses/predictions/business-success", methods=["POST"])
@cache.cached(timeout=300)
def predictions_route():
    return getPredictions()
