from django.db import models, transaction
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action


"""Using ViewSets from Django Rest Framework package and overriding its functionality to accommodate parallel 
Elasticsearch usage"""


class ElasticModelViewSet(viewsets.ModelViewSet):
    """Parent Class for all Elasticsearch related ViewSets"""

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        data = response.data
        # Add Elasticsearch data
        self.add_es_data(data)
        return response

    @action(detail=False, methods=['GET'])
    def list_filtered(self, request, *args, **kwargs):
        pass

    def create(self, request, *args, **kwargs):
        data = request.data.dict()
        with transaction.atomic():
            response = super().create(request, *args, **kwargs)
            # Make sure id is not a nested object
            item_id = response.data['id']
            while type(item_id) not in [int, str]:
                item_id = item_id['id']
            data['id'] = item_id
            if 'owner' in data.keys():
                data['owner'] = response.data['owner']
            if 'image' in data.keys():
                del data['image']

            # Add entry to Elasticsearch
            self.es_document_class.init()
            result = self.es_document_class(**data).save()

            self.add_es_data([response.data])
            return response
        #
        #
        # return Response({"error_messages": {"elasticsearch": "Entry could not be created"}}, status=400)

    def perform_create(self, serializer):
        return super().perform_create(serializer)

    def retrieve(self, request, *args, **kwargs):
        response = super().retrieve(request, *args, **kwargs)
        data = response.data
        # Additional information from Elasticsearch
        self.add_es_data([data])
        return response

    def update(self, request, *args, **kwargs):
        if 'partial' not in kwargs:
            result = self.update_es(kwargs['pk'], request.data)
        else:
            result = kwargs['partial_result']
        if result == 'Updated':
            data = super().update(request, *args, **kwargs).data
            self.add_es_data([data])
            return Response(data, 200)
        elif result == 'Elasticsearch entry not found':
            return Response({"error_messages": {"elasticsearch": "Elasticsearch entry not found"}}, status=400)
        elif result == "Couldn't connect to Elasticsearch":
            return Response({"error_messages": {"elasticsearch": "Couldn't connect to Elasticsearch"}})
        return Response({"error_messages": {"unknown": "Something went wrong"}}, status=400)

    def partial_update(self, request, pk=None, *args, **kwargs):
        partial_result = self.update_es(pk, request.data)
        return super().partial_update(request, partial_result=partial_result, *args, **kwargs)

    def destroy(self, request, pk=None, *args, **kwargs):
        result = self.update_es(pk, {'delete': True})
        if result == 'Updated':
            return super().destroy(request, *args, **kwargs)
        elif result == 'Elasticsearch entry not found':
            # return Response({"error_messages": {"elasticsearch": "Elasticsearch entry not found"}}, status=400)
            return super().destroy(request, *args, **kwargs)
        elif result == "Couldn't connect to Elasticsearch":
            # return Response({"error_messages": {"elasticsearch": "Couldn't connect to Elasticsearch"}})
            return super().destroy(request, *args, **kwargs)
        return Response({"error_messages": {"unknown": "Something went wrong"}}, status=400)

    def add_es_data(self, data_list, alternative_es_document=None):
        for item in data_list:
            if 'id' in item:
                # Make sure id isn't an object
                item_id = item['id']
                while type(item_id) not in [int, str]:
                    item_id = item_id['id']
                success = False

                # Try to connect to Elasticsearch 5 times
                for i in range(5):
                    try:
                        if alternative_es_document:
                            es_entry = alternative_es_document.get(id=item_id, ignore=404)
                        else:
                            es_entry = self.es_document_class.get(id=item_id, ignore=404)
                        if es_entry:
                            for k, v in es_entry.to_dict().items():
                                if k not in item.keys():
                                    item[k] = v
                        else:
                            item['error_message'] = {"elasticsearch": "Elasticsearch entry missing!"}
                        success = True
                        break
                    except:
                        pass
                if not success:
                    item['error_message'] = {"elasticsearch": "Couldn't connect to Elasticsearch"}

    def update_es(self, es_id, request_dict):
        data = {}
        for key, value in request_dict.items():
            if key[:-5] == 'location':
                if "location" not in data:
                    data["location"] = {}
                data["location"][key[-3:]] = value
            elif key != 'id':
                data[key] = value
        # Try to update Elasticsearch 5 times
        result = "Couldn't connect to Elasticsearch"
        for i in range(5):
            try:
                es_entry = self.es_document_class.get(id=es_id, ignore=404)
                if es_entry:
                    es_entry.update(**data)
                    result = "Updated"
                else:
                    result = "Elasticsearch entry not found"
                break
            except:
                pass
        return result
