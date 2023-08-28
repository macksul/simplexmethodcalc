from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'POST':
        dec_vars = int(request.form.get('dec_vars', 0))
        slack_vars = int(request.form.get('slack_vars', 0))
        excess_vars = int(request.form.get('excess_vars', 0))
        rows = int(request.form.get('rows', 0))
        cols = int(request.form.get('cols', 0))
        return render_template('newhome.html', dec_vars=dec_vars, slack_vars=slack_vars, excess_vars=excess_vars, rows=rows, cols=cols)
    return render_template('newhome.html', dec_vars=0, slack_vars=0, excess_vars=0, rows=0, cols=0)

if __name__ == '__main__':
    app.run(debug=True)
