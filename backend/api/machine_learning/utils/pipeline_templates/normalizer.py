from sklearn.base import BaseEstimator
import numpy as np
class Normalizer(BaseEstimator):
    def __init__(self,min,max):
        self.min=min
        self.max=max
        
    def fit(self, x, y=None):
        return self
    
    def transform(self, x):
        x= np.array(x)
        return (x- self.min) / (self.max - self.min)  
       