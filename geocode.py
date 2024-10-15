import pandas as pd
from geopy.geocoders import Nominatim
from openpyxl import Workbook

import geokakao as gk

geo_local = Nominatim(user_agent='South Korea')
wb = Workbook()
ws = wb.active
df = pd.read_excel("items.xlsx",usecols='B:D')
duplicateSet = set()

def geocoding(address):
    try:
        geo=geo_local.geocode(address)
        return [geo.latitude,geo.longitude]
    except:
        return [0,0]
    
def geocodingKakao(address):
    try:
        geo = gk.convert_address_to_coordinates(address)
        return geo
    except:
        return [0,0]

def saveAsPos():
    for idx,row in df.iloc[5:].iterrows():
        address = " ".join(["서울특별시",row["Unnamed: 1"],row["Unnamed: 2"]])
        detail = row["Unnamed: 3"]
        pos = geocodingKakao(address)
        if not pos:
            continue
        ws.append([address,detail,pos[0],pos[1]])
        
    wb.save(filename="data_to_pos.xlsx")

def createQuery():
    pos_df = pd.read_excel("data_to_pos.xlsx")
    for idx,row in pos_df.iloc[:10].iterrows():
        address = row[0]
        detail = row[1]
        lat = row[2]
        lng = row[3]
        query = f"INSERT INTO trashcan_info" 
saveAsPos()
