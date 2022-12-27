import os
import json
import ast
import pymongo
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn import metrics
from dotenv import load_dotenv
load_dotenv()
myclient = pymongo.MongoClient(os.getenv('MONGO_URL'))
dblist = myclient.list_database_names()
mydb = myclient["E-commerse-app"]
productsCol = mydb["products"]
products = productsCol.find()
df = pd.DataFrame(list(products))
product_props = df[['category', 'price']]
mapper = {'Mobile': 0, 'Laptop': 1, 'Tablet': 2, "Phụ Kiện": 3}
product_props['category'] = product_props['category'].map(mapper)
product_np = product_props.to_numpy()
k_mean_3 = KMeans(n_clusters=3)
model = k_mean_3.fit(product_np)
result = k_mean_3.labels_
# Phương pháp cùi trỏ để tìm ra điểm n_clusters thích hợp nhất
# metricProduct = metrics.silhouette_score(
#     product_np, label_3, metric='euclidean')  # 0.6654979747726691
# print(metricProduct)

# metricProduct = metrics.calinski_harabasz_score(
#     product_np, label_3)  # 0.6654979747726691
# print(metricProduct) # 38.58631630840318
# sum_distances = []
# K = range(1, 15)
# for k in K:
#     k_mean = KMeans(n_clusters=k)
#     k_mean.fit(product_np)
#     sum_distances.append(k_mean.inertia_)
# plt.plot(K, sum_distances, 'bx-')
# plt.show()
# biểu đồ so sánh cụm dữ liệu
# plt.scatter(product_np[result == 0, 0], product_np[result ==
#             0, 1], c='lightgreen', marker='s', edgecolors='black', label="cluster 1")
# plt.scatter(product_np[result == 1, 0], product_np[result ==
#             1, 1], c='orange', marker='o', edgecolors='black', label="cluster 2")
# plt.scatter(product_np[result == 2, 0], product_np[result ==
#             2, 1], c='blue', marker='v', edgecolors='black', label="cluster 3")
# plt.scatter(model.cluster_centers_[:, 0],
#             model.cluster_centers_[:, 1],
#             s=250, marker='*',
#             c='red',
#             edgecolor='black',
#             label='centroids')
# plt.legend(scatterpoints=1)
# plt.grid()
# plt.show()
df1 = df[['_id', 'price', 'category']]
df1 = df1.dropna()
df2 = df[['_id', 'name']]

lookup = df1.merge(df2, on='_id', how='left')
lookup['cluster'] = result
# print(lookup)

def recommend(model, price, category):
    arr = np.array([[price, category]])
    pred = model.predict(arr)
    print(pred, arr)
    return lookup[lookup['cluster'] == pred[0]]

print(recommend(model, 20000000, 1))
