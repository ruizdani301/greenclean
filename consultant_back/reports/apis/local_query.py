import os
from rest_framework.viewsets import ViewSet
from django.db.models import Max
from rest_framework.response import Response
from reports.serializer import (QuerySerializer,
                                QueryAllSerializer,SaveQuerySerializer,
                                SaveCommentSerializer)
from reports.models import Query, Comment
from rest_framework import status


class QueryViewSet(ViewSet):
    """
        Creates a new entry in the database based on the provided request data.

        Parameters:
            - request: The HTTP request object containing the data to be saved.

        Returns:
            - If the data is valid, returns a HTTP 201 CREATED response.
            - If the data is invalid, returns a HTTP 400 BAD REQUEST
            response with the serialization errors.
    """
    def create(self, request):
        dataDate = {
            'start_date': request.data.get('start_date'),
            'end_date': request.data.get('end_date'),
            'material': request.data.get('material'),
            'query_name': request.data.get('query_name')
        }
        dataQuery = {
                      'description': request.data.get('description'),
                      'user': request.data.get('user'),
                     }
        serializer = SaveQuerySerializer(data=dataDate)
        if serializer.is_valid(raise_exception=True):
            validatedData = serializer.validated_data
            save_date = Query(**validatedData)
            save_date.save()
            serializerQuery = SaveCommentSerializer(data=dataQuery)
            if serializerQuery.is_valid(raise_exception=True):
                validatedData = serializerQuery.validated_data
                max_id = Query.objects.aggregate(Max('id'))['id__max']
                instance = Query.objects.get(id=max_id)
                instance_comment = Comment(**validatedData)
                instance_comment.save()
                instance.commentid = instance_comment
                instance.save()

            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def list(self, request):
        """
        Retrieves a list of query data.
        Args: request: The request object.

        Returns: A Response object containing the serialized query
        data or an error message with a 500 status code.
        """
        queryset = Query.objects.get_query_data()
        if queryset is None:
            return Response({"message": "error"},
                            status=500)
        serializer = QuerySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def retrieve(self, request, pk=None):
        try:
            queryset = Query.objects.get(pk=pk)
            serializer = QueryAllSerializer(queryset)
            return Response(serializer.data)
        except:
            return Response({"mesage":"No exist"})
