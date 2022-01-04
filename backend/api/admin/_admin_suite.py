from django.contrib import admin
from ..models import Suite

class SuiteAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "audio"
    )

# Register your models here.

admin.site.register(Suite, SuiteAdmin)
