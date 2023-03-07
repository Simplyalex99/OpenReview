import pandas as pd 
df_pearson_correlation = pd.read_csv('./api/machine_learning/data/yelp_business_categories_correlation.csv')
df_popular_business = pd.read_csv('./api/machine_learning/data/business_recommendations.csv')
"""
@desc: predicts business success based on customer reviews and ratings.

@args:
    data (List[List[int]]): Counter vectozier data of customer reviews merged with the customers ratings
    model (Object): Support Vector Machine classifier instance.

@returns:
    int: 1 for successful
    if majority of the prediction is 1 else 0 for unsuccesful.
"""
def get_business_types_by_category(business_category):
  correlation_cut_off = 0.2
  business_categories_column_index = 0
  if business_category not in df_pearson_correlation.columns.values:
    return []
  df_sorted_by_similarity = df_pearson_correlation[business_category].sort_values(ascending=False)#.iloc[:-1]
  df_top_competitors = df_sorted_by_similarity.loc[df_sorted_by_similarity>correlation_cut_off]
  df_top_competitors_indices = df_top_competitors.index
  
  df_business_competitors = df_pearson_correlation.iloc[df_top_competitors_indices]
   
  business_competitor_categories = df_business_competitors.iloc[:,business_categories_column_index]
  return business_competitor_categories.tolist()
"""
@desc: predicts business success based on customer reviews and ratings.

@args:
    data (List[List[int]]): Counter vectozier data of customer reviews merged with the customers ratings
    model (Object): Support Vector Machine classifier instance.

@returns:
    int: 1 for successful
    if majority of the prediction is 1 else 0 for unsuccesful.
"""
def get_popular_businesses_by_category(business_category):
  df_businesses_by_category =df_popular_business.loc[df_popular_business['category']==business_category]
  df_businesses_sorted =df_businesses_by_category.sort_values('score', ascending=False)
  results = []
  counter = 0
  max_size = 8
  for index,row  in df_businesses_sorted.iterrows():
    if counter >= max_size:
      break
    business_info = {'business_id':row['business_id'],'business_name':row['business_name'],'business_rating':row['business_rating']}
    results.append(business_info)
    counter+=1
  return results   