from flask import Flask
from flask_caching import Cache
from dotenv import load_dotenv
from api.errors.handler import register_error_handlers
from config import BaseConfig
import os
load_dotenv()
def create_app():
    app = Flask(__name__)
    app.config.from_object(BaseConfig)
    register_error_handlers(app)
    return app

