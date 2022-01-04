from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Question

class QuestionView(viewsets.ViewSet):
    @action(detail=False, methods=["POST"])
    def create_suite(self, request):
        try:
            Question\
                .objects\
                .filter(suite=request.data[0]["suite"])\
                .delete()
            for i in request.data:
                Question.objects.create(\
                    suite=i["suite"],
                    idx=i["idx"],
                    ans=i["ans"],
                    txt_a=i["txt_a"],
                    txt_b=i["txt_b"],
                    txt_c=i["txt_c"],
                    txt_d=i["txt_d"]
                )
            return Response(data={"success": True})
        except:
            return Response(data={"success": True})
    @action(detail=False, methods=["GET"])
    def get_questions(self, request):
        try:
            suite = request.GET.get("suite")
            return Response(data={\
                "success": True,
                "result":\
                    list(Question.objects.filter(suite=suite).values())
            })
        except:
            return Response(data={"success": False})
