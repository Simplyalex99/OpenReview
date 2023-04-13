from api.machine_learning.utils.pipeline_templates.lemmatizer import Lemmatizer
from api.machine_learning.utils.data_cleaning.preprocess import get_stop_words , filter_noun_adj
"""Preprocesses customer reviews and cleans text.
  @Args:
    data (list[list[str]]): customer reviews.
  @Returns:
    List[list[str]]: A 2d list of preprocessed customer reviews.
"""
def preprocess_topics(data):
    stop_words = get_stop_words()
    lemmatizer = Lemmatizer(stop_words)
    data_new = lemmatizer.transform(data)
    clean_data = filter_noun_adj(data_new)
    return clean_data