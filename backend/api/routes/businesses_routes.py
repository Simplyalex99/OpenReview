from flask import request
from api import app
from api.controllers.businesses_controller import getBusinesses
from api.helpers.utils.query_builder import queryBuilder

# @app.route("/businesses/<business>",methods=["GET"])


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

