from api.machine_learning.utils.pipeline_templates.lemmatizer import Lemmatizer
from api.machine_learning.utils.data_cleaning.preprocess import get_stop_words , filter_noun_adj
def preprocess_topics(data):
    stop_words = get_stop_words()
    lemmatizer = Lemmatizer(stop_words)
    data_new = lemmatizer.transform(data)
    clean_data = filter_noun_adj(data_new)
    return clean_data