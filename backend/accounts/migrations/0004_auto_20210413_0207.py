# Generated by Django 3.1.6 on 2021-04-12 20:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0003_user_otp_code'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=20, null=True, unique=True, verbose_name='phone number'),
        ),
    ]
