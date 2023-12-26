from flask import Flask, request # Imports
from replit import db # Imports Part 2
app = Flask('app') # Create our app

@app.route('/')
def hello_world():
  return 'Hello, World! This is a homepage! I suggest using AJAX for making http requests.'

@app.route('/api/store', methods=["GET"]) # GET is not secure, you should use POST in production.
def store():
  db[request.args.get("key")] = request.args.get("value")
  return "Done"

@app.route('/api/get', methods=["GET"]) # GET is not secure, you should use POST in production.
def get():
  return db[request.args.get("key")]

app.run(host='0.0.0.0', port=8080)
