from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from ..models import Answer

class AnswerView(viewsets.ViewSet):
    @action(detail=False, methods=["POST"])
    def submit_answers(self, request):
        try:
            for i in request.data:
                Answer.objects.create(\
                    question_id=i["question"],
                    user=i["user"],
                    ans=i["ans"],
                    timestamp=i["timestamp"]
                )
            return Response(data={"success": True})
        except:
            return Response(data={"success": False})
    @action(detail=False, methods=["GET"])
    def get_attempts(self, request):
        try:
            user = request.GET.get("user")
            suite = request.GET.get("suite")
            return Response(data={\
                "success": True,
                "result":\
                    list(Answer.objects.filter(\
                            user=user,
                            question__suite=suite
                        ).values(
                            "timestamp"
                        ).distinct().order_by("-timestamp")
                    )
            })
        except:
            return Response(data={"success": False})
    @action(detail=False, methods=["GET"])
    def get_answers(self, request):
        try:
            user = request.GET.get("user")
            suite = request.GET.get("suite")
            timestamp = request.GET.get("timestamp")
            return Response(data={\
                "success": True,
                "result":\
                    list(\
                        Answer.objects.filter(\
                            user=user,
                            question__suite=suite,
                            timestamp=timestamp
                        ).values(\
                            "question__idx",
                            "ans",
                            "question__ans"
                        )
                    )
            })
        except:
            return Response(data={"success": False})
