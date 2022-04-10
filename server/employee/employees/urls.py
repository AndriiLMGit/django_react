from rest_framework import routers
from . import views


router = routers.DefaultRouter()
router.register('employees', views.EmployeeViewSet, 'employees')
router.register('employees/<int:pk>', views.EmployeeViewSet, 'employees')


urlpatterns = router.urls
