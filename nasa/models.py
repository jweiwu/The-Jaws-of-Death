from django.db import models

class Report(models.Model):
    _type = models.IntegerField()
    # _range = models.IntegerField()
    longitude = models.FloatField()
    latitude = models.FloatField()
    postdate = models.DateTimeField()
    remarks = models.CharField(max_length = 254, default=None, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add = True)
