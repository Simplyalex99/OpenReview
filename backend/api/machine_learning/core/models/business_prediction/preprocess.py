from api.machine_learning.utils.data_cleaning.preprocess import get_stop_words
from api.machine_learning.utils.pipeline_templates.lemmatizer import Lemmatizer
from api.machine_learning.utils.pipeline_templates.normalizer import Normalizer
import numpy as np
import joblib
from api.machine_learning.utils.pipeline_templates.prebuilt_tfidfvectorizer import PrebuiltTfidfVectorizer 
tfidf_model = joblib.load('./api/machine_learning/assets/models/tfidf_model.sav') 
"""Recommends popular business from the same category of the given input category.
  @Args:
    data_ (list[list[list[any]]]): The dataset storing the customer reviews and ratings seperately.
  @Returns:
    List[List[Union[str,float]]]: A 2d array storing the transformed data from the pipeline templates.
"""
def preprocess_data(data_):

  # intializing attributes for the pipelines
  words_excluded = ['not','below','no']
  language= 'english'
  stop_words = get_stop_words(words_excluded,language)
  features_to_drop = ['com','chinatown','disney','salsa','burrito','picture','wednesday'
  ,
  'chair','groupon','turkey','window','tell','im','said','bakery','milk','chip','writing','chili','school','noodle','sister','beef',
  'birthday','seafood','spicy','rice','thursday','machine','bbq','greek','student','hair','asked','thai','margarita','dumpling','drive',
  'woman','sit','sauce','wife','lamb','mexican','shrimp','salmon','anniversary','girlfriend','th','baby','brother','boy','pho','ask','gym',
  'mid'
  ]
  min_rating=1
  max_rating=5

  # pipeline transformation
  pipeline = [(0,Lemmatizer(stop_words)),(0,PrebuiltTfidfVectorizer(tfidf_model,columns_drop=features_to_drop)),(1,Normalizer(min=min_rating,max=max_rating))]
  store = {} 
  for index, transformer in pipeline:
    data = None
    if index not in store:
      store[index] = data_[index]
    data = store[index]
    transformed_data = transformer.transform(data)
    store[index] = transformed_data

  # merges transformed data in order of column indices
  indices = sorted(store.keys())  
  size_indices = len(indices)
  start_index = indices[0]
  merged_data = store[start_index]
  for i in range(1,size_indices):
    merged_data = np.append(merged_data, store[i], axis=1)
  return merged_data