from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from django.http import Http404
from .serializers import EmployeeSerializer
from .models import Employee


# Lead Viewset


class EmployeeViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = EmployeeSerializer

    # For JSON Renderer
    # renderer_classes = [renderers.JSONRenderer]

    def get_queryset(self):
        return self.request.user.employees.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def destroy(self, request, pk, **kwargs):
        try:
            employee = Employee.objects.get(pk=pk)
        except Employee.DoesNotExist:
            raise Http404

        employee.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
