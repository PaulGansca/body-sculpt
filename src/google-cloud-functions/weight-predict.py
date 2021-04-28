# Dependencies
# numpy==1.18.5
# scikit-learn==0.23.2

def weight_predict(request):
    if request.method == 'OPTIONS':
        # Allows GET requests from any origin with the Content-Type
        # header and caches preflight response for an 3600s
        headers = {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Max-Age': '3600'
        }

        return ('', 204, headers)

    import numpy as np
    import sklearn
    from sklearn.linear_model import LinearRegression
    from sklearn.metrics import mean_squared_error
    """Responds to any HTTP request.
    Args:
        request (flask.Request): HTTP request object.
    Returns:
        The response text or any set of values that can be turned into a
        Response object using
        `make_response <http://flask.pocoo.org/docs/1.0/api/#flask.Flask.make_response>`.
    """
    headers = {
        'Access-Control-Allow-Origin': '*'
    }
    request_json = request.get_json()
    print(request_json)
    # Define the problem
    problem = request_json['pastPerformances']

    x = []
    y = []

    for (xi, yi) in enumerate(problem):
        x.append([xi])
        y.append(yi)
    x = np.array(x)
    y = np.array(y)
    print(x)
    print(y)

    # Create linear regression object
    regr = LinearRegression()
    regr.fit(x, y)

    x_test = [[len(x)]]

    # Do predictions
    y_predicted = regr.predict(x_test)

    if request.args and 'message' in request.args:
        return request.args.get('message')
    elif request_json and 'message' in request_json:
        return request_json['message']
    else:
        return (str(y_predicted[0]), 200, headers)
