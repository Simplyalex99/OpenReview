import nltk
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('averaged_perceptron_tagger')
from nltk.corpus import stopwords
from nltk import pos_tag
from nltk.stem import WordNetLemmatizer
"""Generates a set of stopwords.
  @Args:
    words_to_exclude (list[str]): The list of stop words to exclude from the set.
    language (str): The language from which the stop words will be generated from.
  @Returns:
    Set[str]: The set of stopwords generated from the given language.
"""
def get_stop_words(words_to_exclude=[],language='english'):
  all_stop_words = stopwords.words(language.lower())
  if len(words_to_exclude)!=0:
    for word in words_to_exclude:
      all_stop_words.remove(word)
  return all_stop_words
"""Tokenize text and filter words that are noun or adjectively only.
  @Args:
    data (list[list[str]]): 2d array storing the text.
  @Returns:
    List[List[str]]: A list of tokenized text after removing words that are not adjectives or nouns .
"""  
def filter_noun_adj(data):
  is_noun_or_adj = lambda pos: pos[0:2]== 'NN' or pos[0:2]=="JJ"
  results =[]
  for row in data:
    for text in row:
      text_split = text.split()
      nouns_adj = [word for (word,pos) in pos_tag(text_split) if is_noun_or_adj(pos)]
      results.append(nouns_adj)
  return results

"""Converts a list of dictionary to a 2d array for a single attribute
  @Args:
    data (list[Mapping[str:any]]): 2d array storing the content.
  @Returns:
    List[List[any]]: 2d array storing the attribute from the data.
"""  
def split_attribute_to_2d_array(data,key):
  attributes= []
  for content in data:
    if key not in content:
      continue
    attribute = content[key]
    attributes.append([attribute])
  return attributes
