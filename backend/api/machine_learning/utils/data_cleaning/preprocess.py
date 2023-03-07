import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
#nltk.download('omw-1.4')
from nltk.corpus import stopwords
from nltk import pos_tag

from nltk.stem import WordNetLemmatizer
def get_stop_words(words_to_exclude=[],language='english'):
  # Text cleaning
  # TODO: remove stopwords excluding negated words like not.
  # excluding stop words
  all_stop_words = stopwords.words(language.lower())
  if len(words_to_exclude)!=0:
    for word in words_to_exclude:
      all_stop_words.remove(word)
  return all_stop_words
def filter_noun_adj(data):
  is_noun_or_adj = lambda pos: pos[0:2]== 'NN' or pos[0:2]=="JJ"
  results =[]
  for row in data:
    for text in row:
      text_split = text.split()
      nouns_adj = [word for (word,pos) in pos_tag(text_split) if is_noun_or_adj(pos)]
      results.append(nouns_adj)
  return results

  """
@desc: predicts business success based on customer reviews and ratings.

@args:
    data (List[List[int]]): Counter vectozier data of customer reviews merged with the customers ratings
    model (Object): Support Vector Machine classifier instance.

@returns:
    int: 1 for successful
    if majority of the prediction is 1 else 0 for unsuccesful.
"""
def split_text_rating_to_2d_array(data,text_key,rating_key):
  texts = split_attribute_to_2d_array(data,text_key)
  ratings =split_attribute_to_2d_array(data,rating_key)
  return texts,ratings

def split_attribute_to_2d_array(data,key):
  attributes= []
  for content in data:
    attribute = content[key]
    attributes.append([attribute])
  return attributes
