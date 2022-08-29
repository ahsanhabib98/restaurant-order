# Generated by Django 3.1.6 on 2021-06-11 21:13

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0029_auto_20210612_0043'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='customer',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='address', to='restaurant.brandingcustomer'),
        ),
    ]
