# -*- coding: utf-8 -*-
# Generated by Django 1.11.5 on 2017-10-14 16:44
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('game', '0010_auto_20171003_1657'),
    ]

    operations = [
        migrations.RenameField(
            model_name='interactions',
            old_name='obj_id',
            new_name='target_id',
        ),
    ]
