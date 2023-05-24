from run import app
from gevent.pywsgi import WSGIServer
from dotenv import load_dotenv
load_dotenv()
if __name__ == "__main__":
    WSGIServer(('0.0.0.0',5000),app).serve_forever()
