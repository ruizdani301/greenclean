import os
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from django.http import JsonResponse
from reports.serializer import (QuerySerializer,
                                QueryAllSerializer,SaveQuerySerializer)
from reports.models import Query
from rest_framework import status
from django.shortcuts import get_object_or_404



class QueryViewSet(ViewSet):
    def create(self, request):
        """
            Parameters:
                request (Request): The HTTP request object.
        """
        
        serializer = SaveQuerySerializer(data=request.data)
        print(serializer)
        if serializer.is_valid():
            validatedData = serializer.validated_data
            appointment = SaveQuerySerializer(**validatedData)
            print(f"{appointment} linea 25")
            appointment.save()
            serializerResponse = SaveQuerySerializer(
                                  appointment)
            return Response(serializerResponse.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    
     
    def list(self, request):
        """
        Retrieves a list of query data.
        Args: request: The request object.

        Returns: A Response object containing the serialized query data or an error message with a 500 status code.
        """
        queryset = Query.objects.get_query_data()
        if queryset is None:
            return Response({"message": "error"},
                            status=500)
        serializer = QuerySerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

   
    def retrieve(self, request, pk=None):
        print(pk)
     
        queryset = Query.objects.get(pk=pk)
        serializer = QueryAllSerializer(queryset)  # Puedes usar QuerySerializer si es más apropiado
        print(serializer.data)
        return Response(serializer.data)
      