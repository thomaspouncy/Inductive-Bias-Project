# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-15 02:49
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0012_auto_20171014_1659'),
    ]

    operations = [
        migrations.AddField(
            model_name='level',
            name='stock_size',
            field=models.IntegerField(default=0),
        ),
    ]
