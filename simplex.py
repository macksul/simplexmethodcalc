import sys
import numpy as np

from fractions import Fraction

def main():
    global decimals
    global const_num, prod_nums
    print("""
    SIMPLEX  METHOD CALCULATOR

what type of problem do you want to solve?	
    1 :maximization (<=).
    2 :minimization (>=).
    """)
    try:
        prob_type = int(input("enter the number problem type: >"))
    except ValueError:
        print("please enter a number from choices above")
        prob_type = int(input("enter the number problem type: >"))
    if prob_type != 2 and prob_type != 1:
        sys.exit("you enter a wrong problem choice ->" + str(prob_type))

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

    # Gather the coefficients for each constraint
    constraints = []
    for i in range(m):
        constraint_row = []
        for j in range(n):
            try:
                coefficient = float(input(f"Enter the coefficient for variable X{j + 1} in constraint {i + 1}: "))
                constraint_row.append(coefficient)
            except ValueError:
                print("Invalid input. Please enter valid numeric values.")
                return get_tableau_from_user()
        constraints.append(constraint_row)

    # Gather the right-hand side (RHS) values for each constraint
    rhs_values = []
    for i in range(m):
        try:
            rhs_value = float(input(f"Enter the RHS value for constraint {i + 1}: "))
            rhs_values.append(rhs_value)
        except ValueError:
            print("Invalid input. Please enter valid numeric values.")
            return get_tableau_from_user()

    return z_row, constraints, rhs_values

if __name__ == "__main__":
    z_row, constraints, rhs_values = get_tableau_from_user()
    print("Z-row values:", z_row)
    print("Constraints coefficients:", constraints)
    print("Right-hand side (RHS) values:", rhs_values)
