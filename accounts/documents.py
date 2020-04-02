from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat, GeoPoint

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class UserProfileDocument(Document):
    """Educator information"""
    active = Boolean()
    created_at = Date()
    email = Text(fields={'keyword': Keyword()})
    first_name = Text(fields={'keyword': Keyword()})
    id = Keyword()
    image = Text(fields={'keyword': Keyword()})
    last_name = Text(fields={'keyword': Keyword()})
    location = GeoPoint(required=False)
    updated_at = Date()

    class Index:
        name = 'accounts_profile'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.active = True
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class CategoryDocument(Document):
    """Category information"""
    created_at = Date()
    description = Text(fields={'keyword': Keyword()})
    id = Keyword()
    name = Text(fields={'keyword': Keyword()})
    updated_at = Date()

    class Index:
        name = 'accounts_category'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)