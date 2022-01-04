from typing import Text
from django.db import models
from django.db.models.fields import CharField, IntegerField, TextField

class Suite(models.Model):
    name = TextField(blank=False)
    audio = TextField()
