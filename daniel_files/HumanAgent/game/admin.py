# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin

# Register your models here.

from .models import Level, Object, GameRequest,  Proposition, Interactions, Task


class ObjectInline(admin.TabularInline):
    model = Object
    extra = 2


class InteractionInline(admin.TabularInline):
    model = Interactions
    extra = 2


class PropositionInline(admin.TabularInline):
    model = Proposition
    extra = 2


class LevelAdmin(admin.ModelAdmin):
    list_display = ('level_id', )
    inlines = [ObjectInline]


class TaskAdmin(admin.ModelAdmin):
    list_display = ('task_id', )
    inlines = [InteractionInline, PropositionInline]


admin.site.register(Task, TaskAdmin)
admin.site.register(Level, LevelAdmin)
admin.site.register(GameRequest)



