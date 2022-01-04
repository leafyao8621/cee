from django.db import models
from django.db.models.fields import CharField, IntegerField, TextField

class Question(models.Model):
    suite = TextField(blank=False)
    idx = IntegerField(blank=False)
    class Answer(models.TextChoices):
        A = 'A'
        B = 'B'
        C = 'C'
        D = 'D'
    ans = CharField(max_length=1, choices=Answer.choices)
    txt_a = TextField()
    txt_b = TextField()
    txt_c = TextField()
    txt_d = TextField()
