from rest_framework import serializers
from reports.models import Query, Comment

class SaveCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('user', 'description',)

class SaveQuerySerializer(serializers.ModelSerializer):
    comment_id = SaveCommentSerializer(many=True)

    class Meta:
        model = Query
        fields = ('query_name', 'material', 'start_date', 'end_date', 'comment_id') 

"""
    The `BigQuerySerializer` class is a serializer in
    Python that converts an instance into a  representation
    containing the load type, total, and average values.
"""
class BigQuerySerializer(serializers.Serializer):
    load_type = serializers.CharField()
    total = serializers.FloatField()
    average = serializers.FloatField()
    
    def to_representation(self, instance):
        return {
            'load_type': instance['load_type'],
            'total': instance['total'],
            'average': instance['average'],
        }
        


""" 
    The above class is a serializer in Python for a
    BigQueryNotAvg model, which includes fields for
    load_type and total.
 """
class BigQueryNotAvgSerializer(serializers.Serializer):
    load_type = serializers.CharField()
    total = serializers.FloatField()
   
    def to_representation(self, instance):
        return {
            'load_type': instance['load_type'],
            'total': instance['total'],
        }

class QuerySerializer(serializers.Serializer):
    id = serializers.IntegerField()
    user = serializers.CharField()
    query_name = serializers.CharField()
    description = serializers.CharField()
   
    def to_representation(self, instance):
        return {
            'id': instance['id'],
            'user': instance['commentid__user'],
            'query_name': instance['query_name'],
            'description': instance['commentid__description'],
        }

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = 'id', 'user', 'description'
        
class QueryAllSerializer(serializers.ModelSerializer):
  
    class Meta:
        model = Query
    
    def to_representation(self, instance):
        return {
            'id': instance.id,
            'query_name': instance.query_name,
            'material': instance.material,
            'start_date': instance.start_date,
            'end_date': instance.end_date,
            'commentid_id': {'id': instance.commentid.id,
                             'user': instance.commentid.user,
                             'description': instance.commentid.description}
            }
 
# class SaveQuerySerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Query
#         fields = ['query_name', 'material', 'start_date', 'end_date', 'commentid']
    
#     def to_representation(self, instance):
#         return {
#             'query_name': instance.query_name,
#             'material': instance.material,
#             'start_date': instance.start_date,
#             'end_date': instance.end_date,
#             'commentid_id': {'user': instance.commentid.user,
#                              'description': instance.commentid.description}
#             }
class SaveCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('user', 'description',)

class SaveQuerySerializer(serializers.ModelSerializer):
    comment_id = SaveCommentSerializer(many=True)

    class Meta:
        model = Query
        fields = '__all__'
    
    # ('query_name', 'material', 'start_date', 'end_date', 'comment_id')    
    
    # def to_representation(self, instance):
    #     return {
    #         'query_name': instance.query_name,
    #         'material': instance.material,
    #         'start_date': instance.start_date,
    #         'end_date': instance.end_date,
    #         'comment_id': [{
    #             'user': instance.commentid.user if instance.commentid else None,
    #             'description': instance.commentid.description if instance.commentid else None
    #         }]
    #     }