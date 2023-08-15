# Flask app

# Importing simple flask modules
from flask import Flask, render_template, request, redirect, url_for, flash, jsonify

# creating flask app
app = Flask(__name__)

# Create route for home page
@app.route('/')
def home():
    return render_template('newhome.html')

@app.route('/', methods=['POST'])
def get_tableau_from_user():

    dec_vars = request.form.get("dec_vars", type=int, default=0)
    slack_vars = request.form.get("slack_vars", type=int, default=0)
    excess_vars = request.form.get("excess_vars", type=int, default=0)

    # 1 = Z column and 2 = RHS and Row Ops
    n_rows = 1 + slack_vars + excess_vars
    n_cols =  1 + dec_vars + slack_vars + excess_vars + 2
    return render_template('home.html', cols = n_cols, rows = n_rows)
    

# Run app
if __name__ == '__main__':
    app.run(debug=True)

