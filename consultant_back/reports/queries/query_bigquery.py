import os
from google.cloud import bigquery
from reports.connection_biquery.connection import connection_bigquery
from rest_framework.response import Response
def query_bigquery(material,startDate,endDate):
    
    if material != "ALL":
        sqlQuery =  """
            
                SELECT load_type,SUM(load_weight) AS total
                FROM `bigquery-public-data.austin_waste.waste_and_diversion`
                WHERE load_type LIKE '%' || @material || '%'
                AND report_date BETWEEN @startDate AND @endDate
                GROUP BY load_type
                LIMIT 10;
                
                """
        job_config = query_format_with_avg(material, startDate, endDate)
    
    elif material == "ALL":

        sqlQuery =  """
            
                SELECT load_type,SUM(load_weight) AS total
                FROM `bigquery-public-data.austin_waste.waste_and_diversion`
                WHERE report_date BETWEEN @startDate AND @endDate
                GROUP BY load_type
                LIMIT 100;
                
                """
        job_config = query_format_all_material_avg(startDate, endDate)

   
    query_response = connection_bigquery(sqlQuery,job_config)
        
    return query_response




def query_format_with_avg(material,startDate,endDate):
    job_config = bigquery.QueryJobConfig(
                query_parameters=[
                bigquery.ScalarQueryParameter("material", "STRING", material),
                bigquery.ScalarQueryParameter("startDate", "STRING", startDate),
                bigquery.ScalarQueryParameter("endDate", "STRING", endDate),

                    ]
            )
    return job_config

def query_format_all_material_avg(startDate, endDate):
    job_config = bigquery.QueryJobConfig(
                query_parameters=[
                bigquery.ScalarQueryParameter("startDate", "STRING", startDate),
                bigquery.ScalarQueryParameter("endDate", "STRING", endDate),

                    ]
            )
    return job_config