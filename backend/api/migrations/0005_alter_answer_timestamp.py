# Generated by Django 3.2.8 on 2022-01-04 17:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_answer_timestamp'),
    ]

    operations = [
        migrations.AlterField(
            model_name='answer',
            name='timestamp',
            field=models.DateTimeField(),
        ),
    ]
