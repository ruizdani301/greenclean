from  reports.apis.bigquery import BigQueryViewSet
from  reports.apis.local_query import QueryViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r"bigquery", BigQueryViewSet, basename="reports")
router.register(r"localquery", QueryViewSet, basename="reports")
urlpatterns = router.urls