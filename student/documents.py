from datetime import datetime
from elasticsearch_dsl import Document, Date, Nested, Boolean, analyzer, InnerDoc, Completion, Keyword, Text, Integer, \
    Object, Float, Field, ScaledFloat, GeoPoint

html_strip = analyzer('html_strip',
                      tokenizer="standard",
                      filter=["standard", "lowercase", "stop", "snowball"],
                      char_filter=["html_strip"]
                      )


class StudentDocument(Document):
    """Student information"""
    active = Boolean()
    categories = Keyword()
    courses = Keyword()
    created_at = Date()
    educators = Keyword()
    id = Keyword()
    local_connect = Boolean()
    online_connect = Boolean()
    short_bio = Text(required=False)
    show_in_listings = Boolean()
    updated_at = Date()

    class Index:
        name = 'student_student'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.active = True
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class StudentCourseDocument(Document):
    """Student Course information"""
    course = Keyword()
    created_at = Date()
    finished = Boolean()
    id = Keyword()
    student = Keyword()
    updated_at = Date()

    class Index:
        name = 'student_course'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.finished = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class StudentModuleDocument(Document):
    """Student Module information"""
    created_at = Date()
    finished = Boolean()
    id = Keyword()
    module = Keyword()
    student = Keyword()
    student_course = Keyword()
    updated_at = Date()

    class Index:
        name = 'student_module'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.finished = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)


class StudentLessonDocument(Document):
    """Student Lesson information"""
    created_at = Date()
    finished = Boolean()
    id = Keyword()
    lesson = Keyword()
    student = Keyword()
    student_module = Keyword()
    updated_at = Date()

    class Index:
        name = 'student_lesson'

    def save(self, **kwargs):
        self.meta.id = self.id
        del self.id
        self.created_at = datetime.now()
        self.updated_at = datetime.now()
        self.finished = False
        return super().save(**kwargs)

    def update(self, **kwargs):
        return super().update(updated_at=datetime.now(), **kwargs)
