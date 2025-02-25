import pymysql
import pandas as pd
import numpy as np

# MySQL Connection 연결
conn = pymysql.connect(
    host='localhost',
    user='scott',
    password='tiger',
    db='scott', charset='utf8'
)

sql = "select * from emp"
df_emp = pd.read_sql(sql, conn)
print(df_emp)

df_emp.to_csv("emp.csv")
df_emp.to_excel("emp.xlsx")

# print(df_emp[ ['ename', 'sal'] ])

