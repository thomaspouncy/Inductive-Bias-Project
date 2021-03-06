# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-09-29 01:07
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0005_auto_20170929_0106'),
    ]

    operations = [
        migrations.CreateModel(
            name='Interactions',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('from_obj_id', models.CharField(max_length=200)),
                ('to_obj_id', models.CharField(max_length=200)),
                ('action', models.CharField(max_length=200)),
                ('task', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='game.Task')),
            ],
        ),
        migrations.CreateModel(
            name='Proposition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('obj_id', models.CharField(max_length=200)),
                ('feature', models.CharField(max_length=200)),
                ('state', models.CharField(max_length=200)),
                ('task', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='game.Task')),
            ],
        ),
    ]
