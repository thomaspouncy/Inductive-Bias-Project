# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 01:03
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0003_auto_20170929_0101'),
    ]

    operations = [
        migrations.CreateModel(
            name='Task',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('task_id', models.CharField(max_length=200)),
                ('goal', models.CharField(max_length=200)),
                ('play_request', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='game.GameRequest')),
            ],
        ),
    ]