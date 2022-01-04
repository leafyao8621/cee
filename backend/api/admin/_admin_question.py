from django.contrib import admin
from ..models import Question

class QuestionAdmin(admin.ModelAdmin):
    list_display = (
        "suite",
        "idx",
        "ans",
        "txt_a",
        "txt_b",
        "txt_c",
        "txt_d"
    )

# Register your models here.

admin.site.register(Question, QuestionAdmin)
