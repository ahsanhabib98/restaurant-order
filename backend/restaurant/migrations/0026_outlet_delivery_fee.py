# Generated by Django 3.1.6 on 2021-06-08 21:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0025_auto_20210608_0432'),
    ]

    operations = [
        migrations.AddField(
            model_name='outlet',
            name='delivery_fee',
            field=models.IntegerField(default=0),
        ),
    ]