// Initialize table_count to 0
var table_count = 0;

// Stores table values for each iteration
var tableValues = {};

function deleteTable(tableNumber) {
  var tableId = `table-${tableNumber}`;
  var table = document.getElementById(tableId);
  if (!table) {
    console.error(`Table with ID ${tableId} not found.`);
    return;
  }
  table.remove();
  table_count--;

  // delete submit and reset buttons
  var submitId = `row-op-submit-${tableNumber}`;
  var submit = document.getElementById(submitId);
  submit.remove();
}

function generateTable(dec_vars = 0, slack_vars = 0, excess_vars = 0) {
  // Increment the table_count
  table_count++;

  var n_rows = 1 + slack_vars + excess_vars;
  var doc = document.getElementById("document-body");
  var div_row = document.createElement("div");
  div_row.classList.add("row");
  doc.appendChild(div_row);
  var div_size = document.createElement("div");
  div_row.appendChild(div_size);
  var table = document.createElement("table");
  table.setAttribute("class", "table table-bordered");
  table.setAttribute("id", `table-${table_count}`); // Set a unique table ID
  div_size.appendChild(table);
  var tbody = table.createTBody();
  var thead = table.createTHead();

  var n_vars = dec_vars + slack_vars + excess_vars;

  for (var row = 0; row <= n_rows; row++) {
    var newRow = document.createElement("tr");

    if (row == 0) {
      var rowNumberCell = document.createElement("td");
      rowNumberCell.textContent = "Row";
      newRow.appendChild(rowNumberCell);

      var zCell = document.createElement("td");
      zCell.textContent = "Z";
      newRow.appendChild(zCell);

      for (var dec_var = 1; dec_var <= dec_vars; dec_var++) {
        var dec_varCell = document.createElement("td");
        dec_varCell.innerHTML = `x<sub>${dec_var}</sub>`;
        newRow.appendChild(dec_varCell);
      }

      for (var slack_var = 1; slack_var <= slack_vars; slack_var++) {
        var slack_varCell = document.createElement("td");
        slack_varCell.innerHTML = `s<sub>${slack_var}</sub>`;
        newRow.appendChild(slack_varCell);
      }

      for (var excess_var = 1; excess_var <= excess_vars; excess_var++) {
        var excess_varCell = document.createElement("td");
        excess_varCell.innerHTML = `e<sub>${excess_var}</sub>`;
        newRow.appendChild(excess_varCell);
      }

      var rhsCell = document.createElement("td");
      rhsCell.textContent = "RHS";
      newRow.appendChild(rhsCell);

      var operationsCell = document.createElement("td");
      operationsCell.textContent = "Row Operations";
      newRow.appendChild(operationsCell);
      thead.appendChild(newRow);

      // Add submit and reset buttons with IDs that include table_count
      var buttons = document.createElement("div");
      buttons.setAttribute("class", "form-group");
      buttons.setAttribute("id", `row-op-submit-${table_count}`);
      div_row.appendChild(buttons);
      var buttons_size = document.createElement("div");
      buttons_size.setAttribute("class", "submit-buttons");
      buttons.appendChild(buttons_size);
      var submit_button = document.createElement("input");
      submit_button.setAttribute("type", "submit");
      submit_button.setAttribute("class", "btn btn-success");
      submit_button.setAttribute("value", "Submit");
      submit_button.setAttribute("id", `submit-${table_count}`);
      buttons_size.appendChild(submit_button);
      var reset_button = document.createElement("input");
      reset_button.setAttribute("type", "reset");
      reset_button.setAttribute("class", "btn btn-danger");
      reset_button.setAttribute("value", "Reset");
      reset_button.setAttribute("id", `reset-${table_count}`);
      buttons_size.appendChild(reset_button);

      // Add event listeners to the submit and reset buttons
      // Submit button Event Listener
      submit_button.addEventListener("click", function () {
        // Check if last table. If not, delete all tables that come after it
        var table_id = submit_button.id.split("-")[1];
        if (table_id != table_count) {
          for (var i = table_count; i > table_id; i--) {
            deleteTable(i);
          }
        }

        // Check if it's not the first table and fill the table with the updated values
        if (table_id !== 0) {
          storeTableValues(table_id);
        }

        // Get the values of the decision variables, slack variables, and excess variables
        var dec_vars = parseInt(document.getElementById("dec_vars").value);
        var slack_vars = parseInt(document.getElementById("slack_vars").value);
        var excess_vars = parseInt(
          document.getElementById("excess_vars").value
        );

        // Check if it's the last table and generate a new table
        if (table_id == table_count) {
          generateTable(dec_vars, slack_vars, excess_vars);
        } else {
          storeTableValues(table_id + 1);
          fillTable(table_id + 1);
        }

        // Check if it's not the first table and fill the table with the updated values
        if (table_id != 0) {
          storeTableValues(table_id);
          fillTable(table_id);
        }
      });

      reset_button.addEventListener("click", function () {
        var table_id = reset_button.id.split("-")[1];
        for (var i = table_count; i >= table_id; i--) {
          deleteTable(i);
        }

        // Check if it's not the first table and fill the table with the updated values
        if (table_id !== 0) {
          storeTableValues(parseInt(table_id) - 1);
        }

        // Get the values of the decision variables, slack variables, and excess variables
        var dec_vars = parseInt(document.getElementById("dec_vars").value);
        var slack_vars = parseInt(document.getElementById("slack_vars").value);
        var excess_vars = parseInt(
          document.getElementById("excess_vars").value
        );

        // Check if it's the last table and generate a new table
        if (parseInt(table_id) - 1 == table_count) {
          generateTable(dec_vars, slack_vars, excess_vars);
        }

        // You can add reset functionality here if needed
      });
    } else {
      var rowNumberCell = document.createElement("td");
      rowNumberCell.textContent = row - 1;
      newRow.appendChild(rowNumberCell);

      var zCell = document.createElement("td");
      if (table_count == 1) {
        zCell.innerHTML =
          '<input type="float" class="form-control" name="z_' +
          row +
          '" id="z_' +
          row +
          '">';
      } else {
        var row_ops = tableValues[table_count - 1][row - 1];
        var row_op = row_ops[row_ops.length - 1];
        var lastTable = tableValues[table_count - 1];
        var resultArray = [];

        for (let i = 0; i < lastTable.length; i++) {
          resultArray.push(lastTable[i][0]);
        }
        zCell.innerHTML =
          '<td type="float" name="z_' +
          row +
          '" id="z_' +
          row +
          '" value="' +
          parseString(row_op, resultArray) +
          '">' +
          parseString(row_op, resultArray) +
          "</td>";
        console.log(row_op);
      }
      newRow.appendChild(zCell);

      for (var i = 1; i <= n_vars; i++) {
        var variableCell = document.createElement("td");

        if (table_count == 1) {
          variableCell.innerHTML =
            '<input type="text" class="form-control" name="variable_' +
            i +
            '" id="variable_' +
            i +
            '" value="">';
        } else {
          var row_ops = tableValues[table_count - 1][row - 1];
          var row_op = row_ops[row_ops.length - 1];
          var lastTable = tableValues[table_count - 1];
          var resultArray = [];
          for (let r = 0; r < lastTable.length; r++) {
            resultArray.push(lastTable[r][i]);
          }
          console.log(resultArray);
          variableCell.innerHTML =
            '<td type="float" name="variable_' +
            i +
            '" id="variable_' +
            i +
            '" value="' +
            parseString(row_op, resultArray) +
            '">' +
            parseString(row_op, resultArray) +
            "</td>";
        }
        newRow.appendChild(variableCell);
      }

      var rhsCell = document.createElement("td");
      if (table_count == 1) {
        rhsCell.innerHTML =
          '<input type="text" class="form-control" name="rhs_' +
          i +
          '" id="rhs_' +
          i +
          '" value="">';
      } else {
        var row_ops = tableValues[table_count - 1][row - 1];
        var row_op = row_ops[row_ops.length - 1];
        var lastTable = tableValues[table_count - 1];
        var resultArray = [];

        for (let r = 0; r < lastTable.length; r++) {
          resultArray.push(lastTable[r][lastTable[r].length - 2]);
        }
        rhsCell.innerHTML =
          '<td type="float" name="rhs_' +
          row +
          '" id="rhs_' +
          row +
          '" value="' +
          parseString(row_op, resultArray) +
          '">' +
          parseString(row_op, resultArray) +
          "</td>";
      }
      newRow.appendChild(rhsCell);

      var operationsCell = document.createElement("td");
      operationsCell.innerHTML =
        '<input type="string" class="form-control" name="row_ops_' +
        i +
        '" id="row_ops_' +
        i +
        '">';
      newRow.appendChild(operationsCell);
    }
    tbody.appendChild(newRow);
  }
}

function storeTableValues(tableNumber) {
  var tableId = `table-${tableNumber}`;
  var table = document.getElementById(tableId);
  if (!table) {
    console.error(`Table with ID ${tableId} not found.`);
    return;
  }
  var values_current = []; // Initialize an empty array to store table values
  var values_next = [];
  // Loop through the rows of the curent table
  for (var row = 1; row < table.rows.length; row++) {
    var rowData = []; // Initialize an empty array for each row
    // Loop through the cells of the row
    for (var col = 1; col < table.rows[row].cells.length; col++) {
      var cell = table.rows[row].cells[col];
      // Assuming input elements are always used, get the input value
      var inputValue;
      if (tableNumber == 1) {
        inputValue = cell.querySelector("input").value;
      } else if (col === table.rows[row].cells.length - 1) {
        inputValue = cell.querySelector("input").value;
      } else {
        inputValue = cell.textContent;
      }
      // Push the input value to the row data array
      rowData.push(inputValue);
    }
    // Push the row data array to the values array
    values_current.push(rowData);
  }
  // Now the 'values' array contains the input values organized as a list of lists
  // console.log(`Table ${tableNumber} values:`, values);
  // Stores table values for each iteration
  tableValues[tableNumber] = values_current;
  // Loop through the rows of the curent table
  for (var row = 0; row < table.rows.length - 1; row++) {
    var rowData = []; // Initialize an empty array for each row
    var num_cols = tableValues[tableNumber][row].length;
    var row_op = tableValues[tableNumber][row][num_cols - 1];
    for (var col = 0; col < num_cols - 1; col++) {
      var colData = [];
      for (var inner_row = 0; inner_row < table.rows.length - 1; inner_row++) {
        colData.push(tableValues[tableNumber][inner_row][col]);
      }
      var inputValue = parseString(row_op, colData);
      // Push the input value to the row data array
      rowData.push(inputValue);
    }
    // Push the row data array to the values array
    values_next.push(rowData);
  }
  tableValues[parseInt(tableNumber) + 1] = values_next;
  console.log(tableValues);
}

function parseString(x, column) {
  // First, determine if there is a coefficient by splitting the string x by '*'
  var parts = x.split("*");
  let coeff = 1.0; // If there is no coefficient, set it to 1.0

  if (parts.length > 1) {
    const coeffStr = parts[0].trim();
    try {
      coeff = eval(coeffStr);
    } catch (error) {
      throw new Error(`Invalid coefficient format: '${coeffStr}'`);
    }
  }

  // Check if the first character is a negative symbol and adjust coeff if needed
  if (parts[parts.length - 1][0] === "-") {
    coeff *= -1; // Change the sign of the coefficient if there's a negative symbol
    var rowString = parts[parts.length - 1].slice(1);
  } else {
    var rowString = parts[parts.length - 1];
  }

  check_minus = parts[parts.length - 1].split(/^-/, "");
  if (check_minus.length == 2 && check_minus[0] != "") {
    throw new Error("Invalid operation format, please use addition.");
  }

  // Remove any negative symbols from the string
  var rowString = parts[parts.length - 1].replace(/^-/, "");

  // Split the rowString by '+' to identify the rows to be added
  var rows = rowString.split("+");

  // Initialize an array to store the actual rows from the column
  var rowValues = [];

  // Extract the rows from the column based on their labels
  for (var row of rows) {
    var rowLabel = row.trim(); // Remove any leading/trailing whitespace
    if (rowLabel.startsWith("R")) {
      var rowNumber = parseInt(rowLabel.substring(1), 10); // Extract the row number (assuming format 'R#')
      if (rowNumber >= 0 && rowNumber < column.length) {
        rowValues.push(column[rowNumber]);
      } else {
        throw new Error(`Row label '${rowLabel}' is out of range.`);
      }
    } else {
      throw new Error(`Invalid row label format: '${rowLabel}'`);
    }
  }

  // Calculate the result based on the number of rows
  let result;
  if (rowValues.length === 1) {
    result = coeff * rowValues[0];
  } else if (rowValues.length === 2) {
    result = coeff * parseFloat(rowValues[0]) + parseFloat(rowValues[1]);
  } else {
    throw new Error("Invalid row operation format");
  }
  return result;
}

//function to fill table values
function fillTable(tableNumber) {
  var tableId = `table-${tableNumber}`;
  var table = document.getElementById(tableId);

  if (!table) {
    console.error(`Table with ID ${tableId} not found.`);
    return;
  }

  if (tableValues[tableNumber]) {
    var values = tableValues[tableNumber];

    // Loop through the rows of the table
    for (var row = 1; row < table.rows.length; row++) {
      var rowData = values[row - 1];
      // Loop through the cells of the row
      for (var col = 1; col < table.rows[row].cells.length; col++) {
        var cell = table.rows[row].cells[col];

        // Assuming input elements are always used, set the input value
        if (tableNumber == 1) {
          cell.querySelector("input").value = rowData[col - 1];
        } else if (col === table.rows[row].cells.length - 1) {
          cell.querySelector("input").value = rowData[col - 1];
        } else {
          cell.textContent = rowData[col - 1];
        }
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("input-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      var dec_vars = parseInt(document.getElementById("dec_vars").value);
      var slack_vars = parseInt(document.getElementById("slack_vars").value);
      var excess_vars = parseInt(document.getElementById("excess_vars").value);

      if (table_count == 0) {
        generateTable(dec_vars, slack_vars, excess_vars);
      } else {
        for (var i = table_count; i > 0; i--) {
          deleteTable(i);
        }
        generateTable(dec_vars, slack_vars, excess_vars);
      }
    });
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("input-form")
    .addEventListener("reset", function (event) {
      event.preventDefault();

      document.getElementById("dec_vars").value = "0";
      document.getElementById("slack_vars").value = "0";
      document.getElementById("excess_vars").value = "0";

      for (var i = table_count; i > 0; i--) {
        deleteTable(i);
      }
    });
});
