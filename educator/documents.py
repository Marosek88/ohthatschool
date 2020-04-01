from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat, GeoPoint

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class EducatorDocument(Document):
    """Educator information"""
    id = Keyword()
    location = GeoPoint()
    categories = Keyword()
    contributing_to_courses = Keyword()
    rating = ScaledFloat(scaling_factor=100)
    active = Boolean()
    show_in_listings = Boolean()
    local_connect = Boolean()
    online_connect = Boolean()
    short_bio = Text(required=False)

    created_at = Date()
    updated_at = Date()

    class Index:
        name = 'educator_educator'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.active = True
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)
