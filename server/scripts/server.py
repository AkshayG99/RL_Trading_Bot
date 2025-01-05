# start using python3 server.py

from flask import Flask, jsonify
from flask_cors import CORS

# app instance
app = Flask(__name__)
# allow next.js server to make requests to the api
CORS(app)
print("hi")

@app.route("/api/home", methods=["GET"])
def return_home():
    return jsonify({
        "message": "Hello world!",
        "people": ["Jack", "Jill", "John"]
    })

if __name__ == '__main__':
    app.run(debug=True, port=8080) # run the server on port 8080
