from flask import Flask
from flask_cors import CORS, cross_origin

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/search-avd")
def searchAvd():
    return {"products": ["product01", "product02"]}


if __name__ == "__main__":
    app.run(debug=True)
