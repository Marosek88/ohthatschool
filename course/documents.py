from datetime import datetime
from elasticsearch_dsl import Document, Date, Boolean, analyzer, Keyword, Text, ScaledFloat

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class CourseDocument(Document):
    """Course information"""
    active = Boolean()
    category = Keyword()
    created_at = Date()
    description = Text(fields={'keyword': Keyword()})
    id = Keyword()
    image = Text(fields={'keyword': Keyword()})
    owner = Keyword()
    price = ScaledFloat(scaling_factor=100)
    rating = ScaledFloat(scaling_factor=100)
    title = Text(fields={'keyword': Keyword()})
    updated_at = Date()

    class Index:
        name = 'course_course'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class ModuleDocument(Document):
    """Course Module information"""
    active = Boolean()
    course = Keyword()
    created_at = Date()
    description = Text(fields={'keyword': Keyword()})
    id = Keyword()
    rating = ScaledFloat(scaling_factor=100)
    image = Text(fields={'keyword': Keyword()})
    owner = Keyword()
    title = Text(fields={'keyword': Keyword()})
    updated_at = Date()

    class Index:
        name = 'course_module'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class LessonDocument(Document):
    """Course Class information"""
    active = Boolean()
    course = Keyword()
    created_at = Date()
    description = Text(fields={'keyword': Keyword()})
    id = Keyword()
    duration = ScaledFloat(scaling_factor=100)
    module_guid = Keyword()
    rating = ScaledFloat(scaling_factor=100)
    module = Keyword()
    owner = Keyword()
    title = Text(fields={'keyword': Keyword()})
    updated_at = Date()

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
