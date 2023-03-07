from sklearn.base import BaseEstimator
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
import pandas as pd
class PrebuiltTfidfVectorizer(BaseEstimator):
    def __init__(self,tfidf_model,columns_drop = []):
        self.tfidf_model=tfidf_model
        self.columns_drop = columns_drop
    def fit(self, x, y=None):
        return self
    
    def transform(self, x):
        x = x.flatten()
        result = self.tfidf_model.transform(x)
        x = np.array(result.toarray())
        df = pd.DataFrame(x, columns=self.tfidf_model.get_feature_names_out())
        df = df.drop(columns=self.columns_drop)
        return df.to_numpy()
