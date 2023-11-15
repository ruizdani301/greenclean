from django.db import models
from django.db import DatabaseError

class QueryManager(models.Manager):
    def get_query_data(self):
        try:
            return self.values('id', 'commentid__user', 'query_name', 'commentid__description')
        except DatabaseError as e:
          
            print(f"query error: {e}")
            return None  