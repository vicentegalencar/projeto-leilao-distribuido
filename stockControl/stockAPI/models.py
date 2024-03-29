from datetime import datetime
from django.utils.timezone import now
from django.db import models

# Create your models here.

class Item(models.Model):

    class Meta:

        db_table = 'item'

    name = models.CharField(max_length=200)
    owner = models.CharField(max_length=200)
    category = models.CharField(max_length=200)
    registration_date = models.DateTimeField(default=now)
    description = models.CharField(max_length=500)
    photo = models.ImageField(upload_to="images/")


    def __str__(self):
        return self.name

