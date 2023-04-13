from api.errors.templates.api_error import APIError
from api.errors.templates.invalid_input_error import InvalidInputError
from api.errors.templates.service_unavailable_error import ServiceUnavailableError
import traceback
import json

def register_error_handlers(app):
    def build_error_response(e):
        response = {}
        response['data'] = {
            "status": e.code,
            "name": e.name,
            "description": e.description,
        }
        response['content_type'] = "application/json"
        return json.dumps(response)

    @app.errorhandler(404)
    def handle_exception(e):
        response = e.get_response()
        return response

    @app.errorhandler(APIError)
    def handle_exception(e):
        response = build_error_response(e)
        return response

    @app.errorhandler(InvalidInputError)
    def handle_exception(e):
        response = build_error_response(e)
        return response

    @app.errorhandler(Exception)
    def handle_exception(e):
        app.logger.error("Unhandled Exception: {}".format(str(e)))
        app.logger.debug(
            "".join(
                traceback.format_exception(
                    etype=type(e), value=e, tb=e.__traceback__
                )
            )
        )
        response = {"description": "something went wrong", "status": 500}
        return response, 500

