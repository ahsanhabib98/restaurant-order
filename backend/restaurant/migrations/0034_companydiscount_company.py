# Generated by Django 3.1.6 on 2021-06-12 08:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0033_companydiscount'),
    ]

    operations = [
        migrations.AddField(
            model_name='companydiscount',
            name='company',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_discount', to='restaurant.company'),
        ),
    ]
