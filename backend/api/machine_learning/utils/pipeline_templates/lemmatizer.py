from nltk.stem import WordNetLemmatizer
import numpy as np
from nltk.corpus import stopwords
from sklearn.base import BaseEstimator
import regex as re
class Lemmatizer(BaseEstimator):
    def __init__(self,stop_words=None):
        self.lemmatization = WordNetLemmatizer()
        if stop_words == None:
          self.stop_words = stopwords.words('english')
        else:
          self.stop_words = stop_words

        
    def fit(self, x, y=None):
        return self
    
    def transform(self, x):
        x = self.lemmatize_sentences(x)
        x = np.array(x)
        return x

    def lemmatize_sentences(self,sentences):
      results = []
      for row in sentences:
        result = []
        for sentence in row:    
          text = re.sub('[^a-zA-Z]',' ',sentence)
          text = text.lower()
          text= text.split()
          text = [self.lemmatization.lemmatize(word) for word in text if word not in set(self.stop_words)]
          text =' '.join(text)
          result.append(text)
        results.append(result) 
      return results
       