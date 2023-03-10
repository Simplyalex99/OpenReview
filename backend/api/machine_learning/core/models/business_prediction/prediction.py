import joblib
from collections import Counter
from api.errors.templates.invalid_input_error import InvalidInputError
model = joblib.load('./api/machine_learning/assets/models/svm_model.sav') 

"""Predicts business success based on customer reviews and ratings.
  @Args:
    data_ (list[list[Union[str,float]]]]): The counter vectozier data merged with customer ratings.
  @Returns:
    bool: True if the majority of the predictions is classified as 1 representing successful else False.
"""
def predict_business_success(data):
    num_features = 1145
    if merged_data.shape[1] !=num_features:
        raise InvalidInputError()
    results = model.predict(data)
    counter=Counter(results)
    total_negative_score = counter[0]
    total_positive_score = counter[1]
    if total_positive_score > total_negative_score:
        return True
    return False  