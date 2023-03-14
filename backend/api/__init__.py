from flask import Flask
from flask_caching import Cache
from dotenv import load_dotenv
from api.errors.handler import register_error_handlers
from config import BaseConfig
import os
load_dotenv()
app = Flask(__name__)
app.config.from_object(BaseConfig)
cache = Cache(app)
register_error_handlers(app)

from api.routes import businesses_routes
