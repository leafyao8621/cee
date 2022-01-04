from django.db import models
from django.db.models.fields import CharField

class Answer(models.Model):
    question = models.ForeignKey(
        "Question",
        on_delete=models.CASCADE,
        blank=False,
        related_name="+"
    )
    user = models.TextField(blank=False)
    class Answer(models.TextChoices):
        A = 'A'
        B = 'B'
        C = 'C'
        D = 'D'
    ans = CharField(max_length=1, choices=Answer.choices)
    timestamp = models.DateTimeField(
        blank=False
    )
