# Generated by Django 3.1.6 on 2021-06-04 05:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0018_auto_20210604_1132'),
    ]

    operations = [
        migrations.AddField(
            model_name='brandingcustomer',
            name='is_verify',
            field=models.BooleanField(default=False),
        ),
    ]
