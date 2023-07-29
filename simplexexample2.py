def get_tableau_from_user():
    m = int(input("Enter the number of constraints: "))
    n = int(input("Enter the number of variables: "))

    tableau = []
    artificial_vars = []
    print("Enter the coefficients of the equations row by row:")
    for _ in range(m):
        row = list(map(float, input().split()))
        artificial_var = int(input("Does this constraint involve an artificial variable? (0 for No, 1 for Yes): "))
        if artificial_var:
            artificial_vars.append(len(row))
            # Append the artificial variable's coefficient as -1 in the row
            row.append(-1)
        tableau.append(row)

    print("Enter the coefficients of the objective function row:")
    obj_func = list(map(float, input().split()))
    num_artificial_vars = len(artificial_vars)

    # Update the objective function for the Big M method
    for i in range(num_artificial_vars):
        obj_func.append(0)

    return tableau, obj_func, artificial_vars


def find_pivot_column(tableau, obj_func):
    # Find the column with the most negative coefficient in the objective function row
    pivot_column = min(range(len(obj_func)), key=lambda x: obj_func[x])
    return pivot_column


def find_pivot_row(tableau, pivot_column):
    # Find the pivot row using the minimum ratio test
    ratios = []
    for i in range(len(tableau)):
        if tableau[i][pivot_column] > 0:
            ratios.append(tableau[i][-1] / tableau[i][pivot_column])
        else:
            ratios.append(float('inf'))

    pivot_row = ratios.index(min(ratios))
    return pivot_row


def pivot_on_element(tableau, pivot_row, pivot_column):
    pivot_value = tableau[pivot_row][pivot_column]

    # Scale the pivot row
    tableau[pivot_row] = [x / pivot_value for x in tableau[pivot_row]]

    # Perform row operations to make all other entries in the pivot column zero
    for i in range(len(tableau)):
        if i == pivot_row:
            continue
        factor = tableau[i][pivot_column]
        tableau[i] = [x - factor * y for x, y in zip(tableau[i], tableau[pivot_row])]


def remove_artificial_vars(tableau, artificial_vars):
    # Remove artificial variables and corresponding columns from the tableau
    tableau = np.delete(tableau, artificial_vars, axis=1)

    # Update the objective function by removing artificial variable coefficients
    tableau[0][-1] = 0  # Set the objective function value to 0

    return tableau


def is_optimal(tableau, obj_func):
    # Check if the objective function row contains any negative values
    return all(x >= 0 for x in obj_func)


def simplex_method(tableau, obj_func, artificial_vars, max_iterations=100):
    iteration = 1
    while not is_optimal(tableau, obj_func) and iteration <= max_iterations:
        pivot_column = find_pivot_column(tableau, obj_func)
        if pivot_column is None:
            print("Unbounded solution.")
            return None

        pivot_row = find_pivot_row(tableau, pivot_column)
        if pivot_row is None:
            print("The solution is degenerate.")
            return None

        pivot_on_element(tableau, pivot_row, pivot_column)

        print(f"\nIteration {iteration}:")
        print_tableau(tableau, obj_func)

        iteration += 1

    # Remove artificial variables from the final tableau
    final_tableau = remove_artificial_vars(tableau, artificial_vars)

    return final_tableau


def print_tableau(tableau, obj_func):
    m, n = len(tableau), len(tableau[0])
    for i in range(m):
        for j in range(n):
            print(f"{tableau[i][j]:.2f}", end="\t")
        print()


def main():
    tableau, obj_func, artificial_vars = get_tableau_from_user()
    print("\nInitial Tableau:")
    print_tableau(tableau, obj_func)

    final_tableau = simplex_method(tableau, obj_func, artificial_vars)

    if final_tableau is not None:
        print("\nFinal Tableau (Last Iteration):")
        print_tableau(final_tableau, obj_func)


if __name__ == "__main__":
    main()


