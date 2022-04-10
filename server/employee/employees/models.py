from turtle import mode
from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Employee(models.Model):
    owner = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        null=True,
        related_name='employees'
    )
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    bio = models.TextField()
    created_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Employeer - {self.name}'
