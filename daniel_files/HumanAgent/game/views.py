# -*- coding: utf-8 -*-
from __future__ import unicode_literals

# from django.shortcuts import render
from django.views import generic
from django.shortcuts import render, get_object_or_404
from .models import Level, GameRequest, Task
from django.core.serializers import serialize

# Create your views here.


def HomePage(request):
    context = {'requested': serialize('json', GameRequest.objects.all())}
    return render(request, 'game/home.html', context)


def GamePage(request, game_id):
    game = get_object_or_404(GameRequest, game_id=game_id)
    level = get_object_or_404(Level, level_id=game.level.level_id)
    task = get_object_or_404(Task, task_id=game.task.task_id)

    serialized_objs = serialize('json', level.object_set.all())
    serialized_interactions = serialize('json', task.interactions_set.all())
    serialized_propositions = serialize('json', task.proposition_set.all())

    context = {
        'grid_size': level.grid_size, 
        'objects': serialized_objs, 
        'interactions': serialized_interactions,
        'propositions': serialized_propositions,
    }
    return render(request, 'game/game.html', context)

