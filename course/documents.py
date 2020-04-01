from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class CategoryDocument(Document):
    """Category information"""
    name = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_category'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class CourseDocument(Document):
    """Course information"""
    tags = Keyword()
    owner = Keyword()
    course_id = Text(fields={'keyword': Keyword()})
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = ScaledFloat(scaling_factor=100)
    price = ScaledFloat(scaling_factor=100)
    rating = ScaledFloat(scaling_factor=100)
    categories = Keyword()
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_course'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class ModuleDocument(Document):
    """Course Module information"""
    course = Keyword()
    tags = Keyword()
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = ScaledFloat(scaling_factor=100)
    rating = ScaledFloat(scaling_factor=100)
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_module'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class LessonDocument(Document):
    """Course Class information"""
    course_guid = Keyword()
    module_guid = Keyword()
    tags = Keyword()
    title = Text(fields={'keyword': Keyword()})
    description = Text(fields={'keyword': Keyword()})
    duration = ScaledFloat(scaling_factor=100)
    rating = ScaledFloat(scaling_factor=100)
    active = Boolean()

    created_at = Date()
    updated_at = Date()
    deleted = Boolean()

    class Index:
        name = 'course_lesson'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.deleted = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)
