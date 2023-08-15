import numpy as np

def get_tableau_from_user():
    m = int(input("Enter the number of constraints: "))
    n = int(input("Enter the number of variables: "))

    # Create the initial tableau
    tableau = []
    for i in range(m + 1):
        tableau_row = []

        if i == 0:
            for j in range(n):
                coefficient = float(input(f"Enter the coefficient for variable X{j + 1} in the Z-row: "))
                tableau_row.append(coefficient)
            for j in range(m):
                tableau_row.append(0)
        else:
            for j in range(n + m):
                if j < n:
                    coefficient = float(input(f"Enter the coefficient for variable X{j + 1} in Row {i + 1}: "))
                    tableau_row.append(coefficient)
                else:
                    if j == n + i - 1:
                        tableau_row.append(1)
                    else:
                        tableau_row.append(0)

        rhs_value = float(input(f"Enter the RHS value for Row {i + 1}: "))
        tableau_row.append(rhs_value)

        row_op = input(f"Enter the row operation for Row {i + 1} ")
        tableau_row.append(row_op) 

        tableau.append(tableau_row)

    return tableau



def main():

    print("SIMPLEX METHOD CALCULATOR")
    print("What type of problem do you want to solve?")
    print("1: Maximization (<=)")
    print("2: Minimization (>=)")

    prob_type = int(input("Enter the problem type number: "))

    while prob_type != 1 and prob_type != 2:
        print("You entered a wrong problem choice")
        prob_type = int(input("Enter the problem type number: "))

    tableau = get_tableau_from_user()

    for row in tableau:
        print(row)


    # test case 1
    # maximization
    # 4 constraints
    # 3 variables
    # z_row = [-50, -20, 25]
    # constraints = [[3, 0, 2], [5, 4, 0], [9, 3, 5], [0, 0, 1]]
    # row_operation = ['-(-50)/3 * R1 + R0", "1/3 * R1", -5/3 * R1 + R2", "-9/3 * R1 + R3", "-0/3 * R1 + R4"]
    # rhs_values = [150, 350, 500, 20]

if __name__ == "__main__":
    main()

    # Prompt user for the number of slack/excess variables instead of constraints