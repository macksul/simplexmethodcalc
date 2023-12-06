# Linear Programming Table Generator Flask App

## Overview

This Flask web application is designed to generate and manipulate tables for linear programming problems. The application dynamically creates tables based on the user's input for decision variables, slack variables, and excess variables. It supports row operations such as addition and subtraction to perform the simplex method iterations.

## Features

## 1. Dynamic Table Generation:

The app dynamically generates tables based on user input for decision variables, slack variables, and excess variables.
Each table represents an iteration in the simplex method.


## 2. Row Operations:

Users can perform row operations (addition and subtraction) to manipulate the table values.
The application supports the use of decision variables, slack variables, and excess variables in row operations.
Submit and Reset:

Users can submit the current table and proceed to the next iteration.
The reset button clears all tables and allows users to start afresh.


## 3. Validation:

The app includes validation checks to ensure that tables are generated and manipulated correctly.
Error messages are displayed for invalid input or operations.


## Getting Started

To run the Flask app locally, follow these steps:

1. Clone the repository:

```python
git clone https://github.com/your-username/linear-programming-app.git
```

2. Navigate to the project directory:

```python
cd linear-programming-app
```

3. Install dependencies:

```python
pip install -r requirements.txt
```

4. Run the Flask app:

```python
python app.py
```

5. Open your web browser and go to http://localhost:5000 to access the application.

## Usage

## Input Form:

Fill in the number of decision variables, slack variables, and excess variables in the input form.
Click "Submit" to generate the initial table.


## Table Operations:

Perform row operations by entering mathematical expressions in the designated cells.
Use variable labels such as x_1, s_2, e_3, and R_1 in the expressions.
Click "Submit" to proceed to the next iteration.

## Reset:

Click "Reset" to clear all tables and start a new linear programming problem.

## Dependencies

Flask
JavaScript (for dynamic table manipulation)

## Notes

This application is designed for educational purposes to visualize the simplex method for linear programming problems.
Ensure that the input follows the specified format and rules for row operations.
Feel free to contribute to the project or report any issues on the GitHub repository.
