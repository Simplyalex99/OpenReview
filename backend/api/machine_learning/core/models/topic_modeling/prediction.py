import joblib
from gensim.models.ldamulticore import LdaMulticore
from gensim.corpora import Dictionary
lda_model = joblib.load('./api/machine_learning/assets/models/lda_model.sav')
dictionary = joblib.load('./api/machine_learning/assets/models/lda_model_dictionary.sav')
"""Predicts the topics for each customer review.
  @Args:
    data (list[list[str]]): the preprocessed data from customers for the model.
    reviews (list[list[str]]): the customer reviews.
  @Returns:
    List[Mapping[str: any]]: A list of dictionary of prediction results defined by the
        model.
"""
def classify_data_top2_category(data,reviews):
  category_dict = {
    0:"others",
    1:"food" ,
    2:"experience",
    3: "service"

    }
  results = []
  review_index = 0
  for text in data:
    bow_vector = dictionary.doc2bow(text)
    top_category_records = sorted(lda_model[bow_vector], key=lambda tup: -1*tup[1])
    category_record = top_category_records[0]
    category_record2 = top_category_records[1]
    index1,score1= category_record
    category1 = None
    if index1 in category_dict:
      category1 = category_dict[index1]
    index2,score2 = category_record2
    category2 = None
    if index2 in category_dict:
      category2 = category_dict[index2]
    review = reviews[review_index][0]  
    result= {'text':review,'categories':[category1,category2]}
    review_index+=1
    results.append(result)

  return results      