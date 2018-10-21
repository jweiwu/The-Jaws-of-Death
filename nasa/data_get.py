
import pandas as pd
import numpy as np
from datetime import timedelta
from django.db.models import Q

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
    
    def get_curr_data(reports):
        latest = reports.latest('postdate')
        # the latest record of the current dataset
        curr_time = latest.postdate
        delt_time = timedelta(hours = 1)
        min_time = curr_time - delt_time
        # df_curr = df.loc[df.postdate>min_time]
        reports = reports.filter(postdate__gt=min_time)
        return reports
    
    def get_section(reports, lon, lat):
        r = 15
        upper_lat = lat + r/100
        lower_lat = lat - r/100
        upper_lon = lon + r/100
        lower_lon = lon - r/100
        reports = reports.filter(Q(longitude__lt=upper_lat) & Q(longitude__gt=lower_lat) &
                        Q(latitude__lt=upper_lon) & Q(latitude__gt=lower_lon))
        return reports
    


    