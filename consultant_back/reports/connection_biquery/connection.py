import os
from google.cloud import bigquery


def connection_bigquery(sqlQuery,job_config):
    
    """ 
        The code `client = bigquery.Client()` creates a client
        object for interacting with the BigQuery service.
        This client object is used to establish a connection
        to the BigQuery service.
    """
    
    try:
        os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "reports/credentials/tienda-bc.json"
    except Exception as e:
            print(f"Error setting GOOGLE_APPLICATION_CREDENTIALS: {e}")

    list_of_rows = []
 
    client = bigquery.Client()
    query_job = client.query(sqlQuery, job_config=job_config)
    
    result = query_job.result()

    if result.total_rows > 0:
        result = list(result)

        """
        The code block you provided is checking the length of the
        first row in the `result` object.
        If the length is equal to 2, it means that the query
        result has two columns.
        """

        for row in result:
            dict_list_rows = {}
            dict_list_rows["load_type"] = row['load_type']
            dict_list_rows["total"] = row['total']
            list_of_rows.append(dict_list_rows)

        return list_of_rows
    else:
        return ("no Data")
