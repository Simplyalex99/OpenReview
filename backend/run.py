from api.factory import create_app
from flask_cors import CORS
from flask_caching import Cache
from dotenv import load_dotenv
load_dotenv()
app= create_app()
cache = Cache(app)
CORS(app)
from api.routes import businesses_routes
