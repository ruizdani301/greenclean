from django.db import models
from reports.manager import QueryManager


class Comment(models.Model):
    user = models.CharField(max_length=100, blank=False, null=False)
    description = models.TextField(blank=True, null=True)
 
    
    class Meta:
        db_table = 'commentquery'
        verbose_name = 'comment'
        verbose_name_plural = 'comment'
        ordering = ['user']
       
    
    def __str__(self):
        return f"{self.user} - {self.description}"

class Query(models.Model):
    query_name = models.CharField(max_length=100, blank=False, null=False)
    material = models.CharField(max_length=100)
    start_date = models.DateField()
    end_date = models.DateField()
    commentid = models.ForeignKey(Comment, related_name='comments', on_delete=models.CASCADE, blank=True, null=True)
    objects = QueryManager()
    
    class Meta:
        db_table = 'query'
        verbose_name = 'Query'
        ordering = ['material']
    
    
    def __str__(self):
        return f"{self.query_name}--{self.material}"
    

# class ListComment(models.Model):
#     main = models.ForeignKey(Comment, related_name='main', on_delete=models.CASCADE, blank=True, null=True)
#     text_comment = models.ForeignKey(Comment, related_name='text_comment', on_delete=models.CASCADE, blank=True, null=True)