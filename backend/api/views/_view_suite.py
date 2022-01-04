from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Suite

class SuiteView(viewsets.ViewSet):
    @action(detail=False, methods=["GET"])
    def get_suites(self, request):
        try:
            return Response(data={\
                "success": True,
                "result":\
                    list(Suite.objects.all().values())
            })
        except:
            Response(data={"success": False})
