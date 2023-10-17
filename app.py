# Flask app

# Importing simple flask modules
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

# creating flask app
app = Flask(__name__)


# Create route for home page
@app.route("/")
def home():
    return render_template("home.html")


@app.route("/", methods=["POST"])
def get_tableau_from_user():
    return render_template("home.html")


# Run app
if __name__ == "__main__":
    app.run(debug=True)
