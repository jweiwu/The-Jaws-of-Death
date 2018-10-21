
import pandas as pd
import numpy as np
from datetime import timedelta

class data_get():

    def wind(df):
        df_ws = df.loc[df._type==6,:]
        return df_ws

    def rain(df):
        df_rs = df.loc[df._type==10,:]
        return df_rs
    
    def temp(df):
        df_ts = df.loc[df._type==3,:]
        return df_ts
    
    def get_curr_data(df):       
        curr_time = df.postdate.iloc[-1]
        delt_time = timedelta(hours = 1)
        min_time = curr_time - delt_time
        df_curr = df.loc[df.postdate>min_time]
        return df_curr
    
    def get_section(df,lon,lat):
        r = 15
        upper_lat = lat + r/110.574
        lower_lat = lat - r/110.574
        upper_lon = lon + r/(111.32*np.cos(lat))
        lower_lon = lon - r/(111.32*np.cos(lat))
        df_sec = df.loc[(df.longitude<upper_lat) & (df.longitude>lower_lat) & 
                        (df.latitude<upper_lon) & (df.latitude>lower_lon)]
        return df_sec
    


    