# Generated by Django 3.1.6 on 2021-05-29 14:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('restaurant', '0015_auto_20210528_0103'),
    ]

    operations = [
        migrations.CreateModel(
            name='CompanyBrand',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('base_color', models.CharField(max_length=100)),
                ('text_color', models.CharField(max_length=100)),
                ('title', models.CharField(max_length=100)),
                ('message', models.TextField()),
                ('cover_photo', models.ImageField(blank=True, null=True, upload_to='company_brand_avatar')),
                ('company', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company_brand', to='restaurant.company')),
            ],
        ),
    ]
