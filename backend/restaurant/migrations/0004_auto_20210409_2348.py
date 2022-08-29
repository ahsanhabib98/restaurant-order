# Generated by Django 3.1.6 on 2021-04-09 17:48

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('restaurant', '0003_auto_20210330_2324'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restaurantuser',
            name='restaurant',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='restaurant_users', to='restaurant.restaurant'),
        ),
        migrations.AlterField(
            model_name='restaurantuser',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='user_restaurant', to=settings.AUTH_USER_MODEL),
        ),
    ]
