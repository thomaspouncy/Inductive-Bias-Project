# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 00:56
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='gamerequest',
            name='level_id',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='gamerequest',
            name='task_id',
            field=models.CharField(default='', max_length=200),
            preserve_default=False,
        ),
    ]