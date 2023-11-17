from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from reports.queries.query_bigquery import query_bigquery
from datetime import datetime
from reports.serializer import (BigQueryNotAvgSerializer)
from rest_framework import status


class BigQueryViewSet(ViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    def list(self, request):
        """
            Parameters:
                request (Request): The HTTP request object.

            Returns:
                Response or JsonResponse: The response containing the
                retrieved data or an error message.

            Raises:
                N/A
        """
        material = request.query_params.get('material')
        startDate = request.query_params.get('startDate')
        endDate = request.query_params.get('endDate')
        if endDate == "null":
            print("la fecha no biene")
            endDate = str(datetime.now().date())
        
        object_query = query_bigquery(material, startDate, endDate)
        if object_query == "no Data":
            return Response({"message": "no data in this date"},
                            status=204)

        serializer = BigQueryNotAvgSerializer(data=object_query,
                                                many=True)
        if serializer.is_valid(raise_exception=True):
            return Response(serializer.data,
                                status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors,
                                status=status.HTTP_400_BAD_REQUEST)