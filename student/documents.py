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
    id = Keyword()
    location = GeoPoint()
    categories = Keyword()
    courses = Keyword()
    active = Boolean()
    show_in_listings = Boolean()
    local_connect = Boolean()
    online_connect = Boolean()
    short_bio = Text(required=False)

    created_at = Date()
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
    id = Keyword()
    student = Keyword()
    course = Keyword()
    finished = Boolean()

    created_at = Date()
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
    id = Keyword()
    student_course = Keyword()
    student = Keyword()
    module = Keyword()
    finished = Boolean()

    created_at = Date()
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
    id = Keyword()
    student_module = Keyword()
    student = Keyword()
    lesson = Keyword()
    finished = Boolean()

    created_at = Date()
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
