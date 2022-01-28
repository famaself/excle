import pandas as pd
import numpy as np

# # 创建一个列表
# a = pd.DataFrame([[1, 2], [3, 4], [5, 6]])
# print(a)

# # 创建自定义列索引和行索引
# a = pd.DataFrame([[1, 2], [3, 4], [5, 6]],
#                  columns=['data', 'score'],
#                  index=['A', 'B', 'C'])
# print(a)

# # 创建列表的另一种方法（用此方法时应保证两列表的长度一致）
# a = pd.DataFrame()
# date = [1,3,5]
# score = [2,4,6]
# a['score'] = score
# a['date'] = date
# print(a)

# # 通过字典创建DataFrame
# b = pd.DataFrame({'a': [1, 3, 5], 'b': [2, 4, 6]}, index=['x', 'y', 'z'])
# print(b)
# #如果想用字典键名作为行索引
# c = pd.DataFrame.from_dict({'a': [1, 3, 5], 'b': [2, 4, 6]}, orient='index')
# print(c)

# # 通过numpy创建的二维数组创建
# a = np.arange(12).reshape(3,4)
# b = pd.DataFrame(a,index=[1,2,3],columns=['a','b','c','d'])
# print(b)

# DataFrame索引的修改
a = pd.DataFrame([[1, 2], [3, 4], [5, 6]],
                 columns=['data', 'score'],
                 index=['A', 'B', 'C'])
a.index.name = '公司'
a = a.rename(index={'A': '万科', 'B': '阿里', 'C': '百度'},
             columns={'data': '日期', 'score': '分数'})
print(a)
a = a.reset_index()#重置列索引
print(a)
# 将其他列设为列索引
a = a.set_index('日期')
print(a)