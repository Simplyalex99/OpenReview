from flask import Flask
from dotenv import load_dotenv
from api.errors.handler import register_error_handlers
load_dotenv()

app = Flask(__name__)
register_error_handlers(app)

from api.routes import businesses_routes
