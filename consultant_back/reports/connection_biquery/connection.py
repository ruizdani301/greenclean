import os
from google.cloud import bigquery
from django.http import JsonResponse
from rest_framework.response import Response

def connection_bigquery(sqlQuery,job_config):

    try:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "reports/credentials/tienda-bc.json"
    except Exception as e:
            print(f"Error setting GOOGLE_APPLICATION_CREDENTIALS: {e}")

    print(os.environ["GOOGLE_APPLICATION_CREDENTIALS"])
    
    list_of_rows = []
    """ 
    The code `client = bigquery.Client()` creates a client
    object for interacting with the BigQuery service.
    This client object is used to establish a connection
    to the BigQuery service.
    """
    client = bigquery.Client()
    query_job = client.query(sqlQuery, job_config=job_config)
    
    result = query_job.result()
    print(result)
    if result.total_rows > 0:
        result = list(result)
        print("TAMAÑO DE EL PRIMER OBJETO")
        """
        The code block you provided is checking the length of the
        first row in the `result` object.
        If the length is equal to 2, it means that the query
        result has two columns.
        """
        print(len(result[0]))
        if len(result[0]) == 2:
            for row in result:
                dict_list_rows = {}
                dict_list_rows["load_type"] = row['load_type']
                dict_list_rows["total"] = row['total']
                list_of_rows.append(dict_list_rows)
        elif len(result[0]) == 3:    
            for row in result:
                dict_list_rows = {}
                dict_list_rows["load_type"] = row['load_type']
                dict_list_rows["total"] = row['total']
                dict_list_rows["average"] = round(row['average'], 2)
                print("tipo de dato")
                print(type(dict_list_rows["average"]))
                list_of_rows.append(dict_list_rows)


        print(list_of_rows)
            
      
        return list_of_rows # list_of_rows
    else:
        return ("no Data")
          