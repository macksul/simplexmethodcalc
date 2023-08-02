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
# Constraints correspond to columns while variables correspond to rows
def get_slack_excess_variables():
    try:
        num_slack = int(input("Enter the number of slack/excess variables: "))
        return num_slack
    except ValueError:
        print("Invalid input. Please enter valid integer values.")
        return get_slack_excess_variables()
def get_z_row_values(num_variables):
    z_row = []
    for i in range(num_variables):
        try:
            coefficient = float(input(f"Enter the coefficient for variable X{i + 1}: "))
            z_row.append(coefficient)
        except ValueError:
            print("Invalid input. Please enter valid numeric values.")
            return get_z_row_values(num_variables)
    return z_row

if __name__ == "__main__":
    try:
        num_variables = int(input("Enter the number of variables in the Z-row: "))
        z_row_values = get_z_row_values(num_variables)
        print("Z-row values:", z_row_values)
    except ValueError:
        print("Invalid input. Please enter a valid integer for the number of variables.")
