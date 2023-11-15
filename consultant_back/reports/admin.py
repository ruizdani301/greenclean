from django.contrib import admin
from reports.models import *


class QueryAdmin(admin.ModelAdmin):
    list_display = (
        'material',
        'start_date',
        'end_date',
        'commentid',
    )
   
    search_fields = ('material',)



class CommentAdmin(admin.ModelAdmin):
    list_display = (
        'user',
        'description',
 
    )
    search_fields = ('user', 'commentid')


admin.site.register(Query, QueryAdmin)
admin.site.register(Comment, CommentAdmin)

