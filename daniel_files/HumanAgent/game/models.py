# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models


# Level
class Level(models.Model):
    level_id = models.CharField(max_length=200)
    grid_size = models.IntegerField(default=0)

    def __str__(self): 
        return self.level_id


class Object(models.Model):
    level = models.ForeignKey(Level, on_delete=models.CASCADE, null=True)
    obj_id = models.CharField(max_length=200)
    X = models.IntegerField(default=0)
    Y = models.IntegerField(default=0)
    exists = models.BooleanField(default=True)
    color = models.CharField(max_length=200)
    shape = models.CharField(max_length=200)
    size = models.CharField(max_length=200)


#  Task
class Task(models.Model):
    task_id = models.CharField(max_length=200)

    def __str__(self): 
        return self.task_id


class Interactions(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)
    actor_id = models.CharField(max_length=200)
    obj_id = models.CharField(max_length=200)
    action = models.CharField(max_length=200)


class Proposition(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)
    obj_id = models.CharField(max_length=200)
    feature = models.CharField(max_length=200)
    state = models.CharField(max_length=200)


# Agent interface
class GameRequest(models.Model):
    game_id = models.CharField(max_length=200)
    level = models.ForeignKey(Level, on_delete=models.CASCADE, null=True)
    task = models.ForeignKey(Task, on_delete=models.CASCADE, null=True)

    def __str__(self): 
        return self.game_id


class GameResult(models.Model):
    game = models.ForeignKey(GameRequest, on_delete=models.CASCADE, null=True)
    action_seq = models.CharField(max_length=2000)
    game_result = models.IntegerField(default=0)
    game_duration = models.IntegerField(default=0)

