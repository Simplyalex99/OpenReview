import joblib
from collections import Counter
from api.errors.templates.invalid_input_error import InvalidInputError
model = joblib.load('./api/machine_learning/assets/models/svm_model.sav') 

"""Converts numerical prediction of businesss success to boolean.
  @Args:
    score (integer): The prediction of the business success.
  @Returns:
    int: True if prediction score is 1 else False.
"""
def int_to_bool(score):
  return True if score == 1 else False

"""Predicts business success based on customer reviews and ratings.
  @Args:
    data_ (list[list[Union[str,float]]]]): The counter vectozier data merged with customer ratings.
  @Returns:
    Tuple[bool,int,int,list[int]]: True if the majority of the predictions is classified as 1 representing successful else False, and the total
    amount of positive score and negative score.
"""

def predict_business_success(data):
    num_features = 1145
    if data.shape[1] !=num_features:
        raise InvalidInputError()  
    results = model.predict(data)
    counter=Counter(results)
    total_negative_score = counter[0]
    total_positive_score = counter[1]
    predictions = list(map(int_to_bool,results))
    is_successful = False
    if total_positive_score > total_negative_score:
        is_successful=True
    return is_successful,total_positive_score,total_negative_score , predictions