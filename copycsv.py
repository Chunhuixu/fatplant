from pymongo import MongoClient
import csv
client=MongoClient('localhost',27017)
db=client.fatplantDB
collection=db.LMPD_Arabidopsis

with open('LMPD_Arabidopsis Only.csv') as csvfile:
    reader=csv.DictReader(csvfile)
    collection.insert_many(reader)
