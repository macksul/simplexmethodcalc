import sys
import numpy as np

def get_tableau_from_user():
    m = int(input("Enter the number of constraints: "))
    n = int(input("Enter the number of variables: "))

    # Gather the coefficients for the Z-row (objective function)
    z_row = []
    for i in range(n):
        try:
            coefficient = float(input(f"Enter the coefficient for variable X{i + 1} in the Z-row: "))
            z_row.append(coefficient)
        except ValueError:
            print("Invalid input. Please enter valid numeric values.")
            return get_tableau_from_user()

    # Gather the coefficients for each constraint and row operations
    constraints = []
    row_operations = []
    for i in range(m):
        constraint_row = []
        for j in range(n):
            try:
                coefficient = float(input(f"Enter the coefficient for variable X{j + 1} in Row {i + 1}: "))
                constraint_row.append(coefficient)
            except ValueError:
                print("Invalid input. Please enter valid numeric values.")
                return get_tableau_from_user()
        constraints.append(constraint_row)

        try:
            row_op = input(f"Enter the row operation for Row {i + 1} (e.g., '=', '<=', '>='): ")
            if row_op not in ('=', '<=', '>='):
                raise ValueError("Invalid row operation. Please enter '=', '<=', or '>='.")
            row_operations.append(row_op)
        except ValueError as e:
            print(e)
            return get_tableau_from_user()

    # Gather the right-hand side (RHS) values for each constraint
    rhs_values = []
    for i in range(m):
        try:
            rhs_value = float(input(f"Enter the RHS value for Row {i + 1}: "))
            rhs_values.append(rhs_value)
        except ValueError:
            print("Invalid input. Please enter valid numeric values.")
            return get_tableau_from_user()

    return z_row, constraints, row_operations, rhs_values

def pivot_row_index(tableau, pivot_col_idx):
    # Calculate the ratios of RHS values to pivot column coefficients
    ratios = [rhs / tableau[i, pivot_col_idx] if tableau[i, pivot_col_idx] > 0 else np.inf for i, rhs in enumerate(tableau[:, -1])]
    # Find the index of the minimum positive ratio
    return np.argmin(ratios)

def simplex_iteration(tableau, pivot_row_idx, pivot_col_idx):
    # Perform row operations to make pivot column equal to the identity vector
    pivot_val = tableau[pivot_row_idx, pivot_col_idx]
    tableau[pivot_row_idx] /= pivot_val

    for i in range(len(tableau)):
        if i == pivot_row_idx:
            continue
        factor = tableau[i, pivot_col_idx]
        tableau[i] -= factor * tableau[pivot_row_idx]

def is_optimal(z_row):
    # Check if all coefficients in the Z-row are non-positive (for minimization)
    return all(coeff <= 0 for coeff in z_row)

def main():
    print("""
    SIMPLEX METHOD CALCULATOR

What type of problem do you want to solve?	
    1: Maximization (<=)
    2: Minimization (>=)
    """)
    try:
        prob_type = int(input("Enter the problem type number: "))
    except ValueError:
        print("Please enter a number from the choices above.")
        prob_type = int(input("Enter the problem type number: "))

    if prob_type != 1 and prob_type != 2:
        sys.exit("You entered a wrong problem choice ->" + str(prob_type))

    z_row, constraints, row_operations, rhs_values = get_tableau_from_user()

    if prob_type == 2:  # Minimization problem
        # Convert the objective function to maximize by multiplying it by -1
        z_row = np.array(z_row) * -1
        # Convert constraints with the row operation '>=' to '<='
        for i, op in enumerate(row_operations):
            if op == '>=':
                z_row = np.append(z_row, 0)
                constraints[i] = np.array(constraints[i]) * -1
                constraints[i] = np.append(constraints[i], 1)
            elif op == '<=':
                z_row = np.append(z_row, 0)
                constraints[i] = np.append(constraints[i], -1)

    # Construct the initial tableau
    tableau = np.column_stack((constraints, rhs_values))
    tableau = np.vstack((z_row, tableau))

    print("Initial Tableau:")
    print(tableau)

    pivot_col_idx = pivot_column_index(tableau[0])
    pivot_row_idx = pivot_row_index(tableau, pivot_col_idx)

    if np.isinf(pivot_row_idx):
        sys.exit("The problem is unbounded.")

    print("\nPivoting around (Row, Column):", (pivot_row_idx, pivot_col_idx))
    simplex_iteration(tableau, pivot_row_idx, pivot_col_idx)
    print("Next Iteration Tableau:")
    print(tableau)

if __name__ == "__main__":
    main()
