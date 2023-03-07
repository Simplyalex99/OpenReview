import joblib
from collections import Counter
model = joblib.load('./api/machine_learning/assets/models/svm_model.sav') 
"""
@desc: predicts business success based on customer reviews and ratings.

@args:
    data (List[List[int]]): Counter vectozier data of customer reviews merged with the customers ratings
    model (Object): Support Vector Machine classifier instance.

@returns:
    int: 1 for successful
    if majority of the prediction is 1 else 0 for unsuccesful.
"""
def predict_business_success(data):
    results = model.predict(data)
    counter=Counter(results)
    total_negative_score = counter[0]
    total_positive_score = counter[1]
    if total_positive_score > total_negative_score:
        return True
    return False  