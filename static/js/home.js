function generateTable(dec_vars = 0, slack_vars = 0, excess_vars = 0) {
  var n_rows = 1 + slack_vars + excess_vars;

  var table = document.getElementById('simplex-table');
  var tbody = table.getElementsByTagName('tbody')[0];

  tbody.innerHTML = '';

  var n_vars = dec_vars + slack_vars + excess_vars;

  for (var row = 0; row <= n_rows; row++) {
    var newRow = document.createElement('tr');

    if (row == 0){
      var rowNumberCell = document.createElement('td');
      rowNumberCell.textContent = "Row";
      newRow.appendChild(rowNumberCell);

      var zCell = document.createElement('td');
      zCell.textContent = "Z";
      newRow.appendChild(zCell);

      for (var dec_var = 1; dec_var <= dec_vars; dec_var++) {
        
        var dec_varCell = document.createElement('td');
        dec_varCell.textContent = `x_${dec_var}`;
        newRow.appendChild(dec_varCell);
      }

      for (var slack_var = 1; slack_var <= slack_vars; slack_var++) {
        
        var slack_varCell = document.createElement('td');
        slack_varCell.textContent = `s_${slack_var}`;
        newRow.appendChild(slack_varCell);
      }
      
      for (var excess_var = 1; excess_var <= excess_vars; excess_var++) {
        
        var excess_varCell = document.createElement('td');
        excess_varCell.textContent = `e_${excess_var}`;
        newRow.appendChild(excess_varCell); 
      }

      var rhsCell = document.createElement('td');
      rhsCell.textContent = "RHS";
      newRow.appendChild(rhsCell);

      var operationsCell = document.createElement('td');
      operationsCell.textContent = "Row Operations";
      newRow.appendChild(operationsCell);

    }
    else{
      var rowNumberCell = document.createElement('td');
      rowNumberCell.textContent = row - 1;
      newRow.appendChild(rowNumberCell);

      var zCell = document.createElement('td');
      zCell.setAttribute('contenteditable', 'true');
      newRow.appendChild(zCell);

      for (var i = 1; i <= n_vars; i++) {
        var variableCell = document.createElement('td');
        variableCell.setAttribute('contenteditable', 'true');
        newRow.appendChild(variableCell);
      }

      var rhsCell = document.createElement('td');
      // Inserting HTML input code in this td element
      rhsCell.innerHTML = '<input type="float" class="form-control" name="rhs" id="rhs" value = 0>';
      newRow.appendChild(rhsCell);

      var operationsCell = document.createElement('td');
      // Inserting HTML input code in this td element
      operationsCell.innerHTML = '<input type="string" class="form-control" name="row_ops" id="row_ops">';
      newRow.appendChild(operationsCell);

    }
    tbody.appendChild(newRow);
  }
}

document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('input-form').addEventListener('submit', function (event) {
    event.preventDefault();

    var dec_vars = parseInt(document.getElementById('dec_vars').value);
    var slack_vars = parseInt(document.getElementById('slack_vars').value);
    var excess_vars = parseInt(document.getElementById('excess_vars').value);

    generateTable(dec_vars, slack_vars, excess_vars);
  });
});