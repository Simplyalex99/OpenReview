from flask import Flask


app = Flask(__name__)


from api.routes import businesses_routes