from django.db import models

class Word(models.Model):
    str = models.CharField(max_length=10)

class WordelGameSession(models.Model):
    numberOfTries = models.IntegerField
    str = models.CharField(max_length=10)