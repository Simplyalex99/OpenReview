## Project Summary

The goal of this project is to provide businesses with key insights to make good business decisions that will save them time and potential money by:

1. Predicting if a business will be successful based on initial customer reviews and rating
2. Categorizing customer reviews by topics to gain deeper insight into different areas where the business is doing well or not
3. Recommend similar competitor businesses by category and popularity.

In each content of this document I will touch on all 3 machine learning problems. Below are the corresponding final results from the tasks mentioned above:

1. Accuracy of predicting a business success based on initial customer reviews and rating is 0.77 or 77% out of 100.
2. Customer reviews from the dataset can be split into 4 categories or topics: others, food, experience, service.
3. To give some examples , people who enjoy Italian restaurants also enjoy wine bars, and other Italian dishes like pizza. People who go to drugstores also enjoy cosmetics and beauty products and convenience store products. Lastly, people who enjoy coffee and tea also enjoy breakfast and brunch, donuts, coffee roasteries, and kombucha. For new businesses, this can help give an idea of what makes some business good and related products.

## Data Description

The data prepared was a combintation of Yelp's API that provides customer reviews on businesses, along with Kaggle dataset on Yelp's businesses and webscrapping with Selenium on tripadvisors.com.

### Data processing

#### Predicting Business Success

The main attributes includes: the review text, the review rating , and score ( this was done through some feature enginnering to find if a business is doing well or not. This was inspired from the following article:https://github.com/vinayarun/BUSINESS-USE-CASE-FOR-NLP/blob/master/Vinay%20Arun_Business%20use%20case%20for%20NLP.pdf). Numerical columns were normalized so all features are within a common scale and prevent potential errors with large scale features, and categorical features were converted to numerical by a method called TF-IDF Vectorizer as this was better since frequency of a word such as "the" can negatively give false readings to our model as to what is a good review or not. Only 1200 features were considered from the TF-IDF vectorizer
were considered. Further analysis shows very little corelation between words using heatmap.

#### Business names and category Recommendation

The main attributes included the business rating and total reviews for that business.

#### Categorizing reviews

The main attribute is the text review from earlier dataset with predicting business sucess which is then preprocessed by removing stopwords, non english characters then extracting meaningful text words that are adjectives or nouns then lemmatizing the text reviews. Lemmmatization is used as it helps our model to predict better from common root words while preserving meaningful words whereas stemming can cut root words off such as caring and cart to car. In addition, bigrams were used to better group similar words and provide better trainning for the model.

## Algorithms

#### Predicting the business sucess

Various binary classifcation algorithms were used such as KNearest Neighbors (KNN), KClusters,
RandomForest (RF), and Support Vector Machine(SVM). The models that performed well were KNN, SVM and RF. To optimize the models, RandomGridSearch was performed and the optimal hyperparameters
was for SVM with rbf kernel and regularization of 1. This makes sense as rbf kernel works
well in high dimension with many features.
<img alt="grid search" src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/algorithms/grid_search.png" width="300" height="190">
In addition, cross validation was done to check for overfitting and the model's validation accuracy remained around the same.

And also feature selection was done by manually looking at features that do not make sense such as "im" and "tof" that do not help the model. These features were dropped reducing the total features to 1144. The accuracy remained the same as these features have little to no significance. Other feature selection methods such as forward selection, recursive elimination and chi-square test could have been used but due to the nature of rbf kernel this was not possible.

#### Business recommendation by popularity and category

For business recommendation by popularity I used a weighted rating formula that takes into account the average rating and the number of votes it has accumulated. This system will make sure that a movie with a 9 rating from 100,000 voters gets a higher score than a movie with the same rating but a mere few hundred voters. This is inspired from the following article https://www.datacamp.com/tutorial/recommender-systems-python . The formula is as follows:

**(v/(v+m) _ R) + (m/(m+v) _ C)**

In the above equation,

v is the number of votes for the business;

m is the minimum votes required to be considered;

R is the average rating of the business;

C is the mean vote across all customer reviews from that whole business.

As for business recommendation by category, I group the same business name by categories
and then performed Pearson’s Correlation Coefficient formula. The closer the correlation coefficient is to 1 between any two variables variables, the more directly proportional they are to each other. If it is closer to -1 , these variables are inversely proportional to each other. And if it is closer to 0, the variables have little to no correlation to each other. This resulted in the matrix as shown below:

<img alt="Pearson Correlation Table" src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/algorithms/correlation_table.png" width="300" height="190">

#### Categorizing reviews

I first performed Principal Component Analysis which reduces the number of features in a dataset with components that can represent a group of closely related features. Initially I tried 2-3 components and visualized it with the help of seaborn however there was very little organized clusters. So I tried n components that would explain 90% of the data's variance and after tried 2 components with T-distributed Stochastic Neighbor Embedding (TSNE). This resulted in the following below:

<img alt="Graph of clusters" src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/algorithms/pca_tsne.png" width="300" height="190">
This resulted in better clusters. I then performed KClusters with 1-10 clusters to see if this agreed with the TSNE and PCA performed earlier and found the optimal to be 4 with the elbow technique as shown below.

<img alt="KNN Elbow" src="https://github.com/Simplyalex99/OpenReview/blob/feat/docs/README_images/algorithms/knn_elbow.png" width="300" height="190">
To find what these clusters represent- that is their catergory for these customer reviews, I used 
Latent Dirichlet Allocation (LDA). This resulted in the following below:

```
[(0, [('place', 0.10510771), ('food', 0.046063803), ('time', 0.025346957)]),
(1,[('location', 0.07435378), ('review', 0.067317665), ('time', 0.059451655)]),
(2, [('pizza', 0.10592735), ('order', 0.067135364), ('car', 0.03214691)]),
(3, [('service', 0.10965675), ('food', 0.10782263), ('year', 0.0693848)])]
```

I manually selected the topics based on the important words however other visualization techniques such pyLDAvis could help get more accurate topics.

## Project Anaylsis

In this section I will give a summary of my approach to the main problem machine learning problem of predicting a business success based on customer reviews and ratings.

#### What model to pick?

I choose SVM rbf since this is a binary classification problem but also this model handles non linear relationship with overlapping data. Since the data has many features SVM works well in higher dimension than other models which are prone to overfitting.

#### How did we clean our data?

I first performed random oversampling since there was uneven amount of label classes. This was needed so that we have a balance dataset and even amount of targets for our model to not be affected. After this, we performed text cleaning process- removal of non english characters, stop words removal and lemmatization. We chose lemmatization since our dataset is not large and we want meaningful words from root.

In addition, I tried PCA but this did not help much as it resulted in too many unknown features and no better accuracy than with all of the chosen features for the model.

#### What type of validation test to perform on data to prepare for model?

I used real data to see model the performance by gettings reviews through Yelp's API and using it with the model. The model performed well in general.

#### What were the assumptions about model and how did you validate those assumptions?

I assumed that the features from the dataset are independent- I used a heatmap to verify this. I also assumed distribution is the same after performing random oversampling- I checked the distribution of each feature before and after performing oversampling and it remained the same. This is important so that the model is not bias. I also assumed for our model every feature is equally standarize-that no feature scale impacts negatively. I normalized the data for this. I also assumed that there is a seperate linear boundary for our model to work well with overlapping features in the dataset. This was confirmed by performing PCA and visualization.

#### How did we optimize our model?

I tried to find optimal hyperparamters using RandomizedSearchCV. We also performed cross validation to check for any overfitting. We also did feature selection and removed any feature that affected the model negatively or had no significance. This was done simply by looking at the features for the model that did not make sense such as "im". This reduced the number of features from 1200 to 1144.

#### How did we implement our test and control?

I ran metrics for precision accuracy and recall using sklearn's metrics library.

#### What is the math behind the model?

The idea behind SVM is finding a decision boundary where data can be seperated, in this this case a line to seperate good businesses from not good ones.

It does this by finding data points closest to the decision boundary. These points are called support vectors. The distance is then calculated from these support vectors and the decision boundary line through a method called Euclidean Distance. This distance is called the margin which allows for a more accurate and generalized decision boundary. The best margin is found through a technique called Cross Validation.

The rbf kernel comes into play by transforming the data into higher dimensions to find better support vectors which leads to a more accurate decision boundary in scenarios when there is overlapping data which is the case for this problem of good business vs not good ones. It does this by finding the dot product and squared Euclidean Distance of all the features in the dataset and then performing SVM. The mapping of features into higher dimension happens through the rbf kernel function which can be expressed as K(x,y)= exp(1/2 \* -|x-y|^2/o^2). The output of this function is between 0-1. Values closer to 0 are very similar whereas anything else is less similar.

## Final Results

1. Accuracy of predicting a business success based on initial customer reviews and rating is 0.77 or 77% out of 100.
2. Customer reviews from the dataset can be split into 4 categories or tags: others, food, experience, service.
3. To give some examples , people who enjoy Italian restaurants also enjoy wine bars, and other Italian dishes like pizza. People who go to drugstores also enjoy cosmetics and beauty products and convenience store products.
   Lastly, people who enjoy coffee and tea also enjoy breakfast and brunch, donuts, coffee roasteries, and kombucha.
   For new businesses, this can help give an idea of what makes some business good and related products.