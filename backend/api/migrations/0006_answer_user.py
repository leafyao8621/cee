# Generated by Django 3.2.8 on 2022-01-04 18:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_alter_answer_timestamp'),
    ]

    operations = [
        migrations.AddField(
            model_name='answer',
            name='user',
            field=models.TextField(default='abc'),
            preserve_default=False,
        ),
    ]
