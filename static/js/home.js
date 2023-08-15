document.getElementById('input-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var dec_vars = parseInt(document.getElementById('dec_vars').value);
  var slack_vars = parseInt(document.getElementById('slack_vars').value);
  var excess_vars = parseInt(document.getElementById('excess_vars').value);

  generateTable(dec_vars, slack_vars, excess_vars);
});

function generateTable(dec_vars, slack_vars, excess_vars) {
  var n_rows = 1 + slack_vars + excess_vars;

  var table = document.getElementById('simplex-table');
  var tbody = table.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';

  var n_cols = 1 + dec_vars + slack_vars + excess_vars + 1; // Z and RHS (add Row Ops)

  for (var row = 1; row <= n_rows; row++) {
    var newRow = document.createElement('tr');

    var rowNumberCell = document.createElement('td');
    rowNumberCell.textContent = row;
    newRow.appendChild(rowNumberCell);

    var zCell = document.createElement('td');
    zCell.setAttribute('contenteditable', 'true');
    newRow.appendChild(zCell);

    for (var i = 1; i <= n_cols; i++) {
      var variableCell = document.createElement('td');
      variableCell.setAttribute('contenteditable', 'true');
      newRow.appendChild(variableCell);
    }

    var rhsCell = document.createElement('td');
    rhsCell.setAttribute('contenteditable', 'true');
    newRow.appendChild(rhsCell);

    var operationsCell = document.createElement('td');
    operationsCell.setAttribute('contenteditable', 'true');
    newRow.appendChild(operationsCell);

    tbody.appendChild(newRow);
  }
}
