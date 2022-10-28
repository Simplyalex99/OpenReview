# @precondition: args is a dictionary
# @postcondition: returns a valid query string
def queryBuilder(args):
    query = ""
    if not isinstance(args, dict):
        return query
    query += "?"
    for option, value in args.items():
        if args[option]:
            query += "{}={}&".format(option, value)

    return query[:-1]

