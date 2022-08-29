# Generated by Django 3.1.6 on 2021-05-21 16:30

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('base', '0003_delete_branding'),
        ('restaurant', '0012_outlet_is_open'),
    ]

    operations = [
        migrations.CreateModel(
            name='Branding',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=120)),
                ('sub_domain', models.CharField(blank=True, max_length=180, null=True)),
                ('avatar', models.ImageField(blank=True, null=True, upload_to='branding_avatar')),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('address', models.CharField(max_length=200)),
                ('delivery_time_min', models.IntegerField(default=0)),
                ('delivery_time_max', models.IntegerField(default=0)),
                ('tax_rate', models.IntegerField(default=0)),
                ('tax_status', models.CharField(choices=[('INCLUSIVE', 'INCLUSIVE'), ('EXCLUSIVE', 'EXCLUSIVE')], default='EXCLUSIVE', max_length=20)),
                ('payment_method', models.CharField(choices=[('CARD', 'Card'), ('CASH', 'Cash')], default='CASH', max_length=20)),
                ('logo', models.ImageField(blank=True, null=True, upload_to='branding_logo')),
                ('description', models.TextField()),
                ('tag_line', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='BrandingUser',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_status', models.CharField(choices=[('CUSTOMER', 'CUSTOMER'), ('MANAGER', 'MANAGER')], max_length=20)),
                ('branding', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='branding_user', to='restaurant.branding')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_branding', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Company',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('is_allow', models.BooleanField(default=False)),
                ('owner', models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='company', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.RemoveField(
            model_name='orderdelivery',
            name='baseentity_ptr',
        ),
        migrations.RemoveField(
            model_name='orderdelivery',
            name='outlet',
        ),
        migrations.RemoveField(
            model_name='orderpickup',
            name='baseentity_ptr',
        ),
        migrations.RemoveField(
            model_name='orderpickup',
            name='outlet',
        ),
        migrations.RemoveField(
            model_name='outlet',
            name='restaurant',
        ),
        migrations.RemoveField(
            model_name='restaurant',
            name='baseentity_ptr',
        ),
        migrations.RemoveField(
            model_name='restaurant',
            name='owner',
        ),
        migrations.RemoveField(
            model_name='restaurantuser',
            name='restaurant',
        ),
        migrations.RemoveField(
            model_name='restaurantuser',
            name='user',
        ),
        migrations.RenameField(
            model_name='payment',
            old_name='amar_pay_charge_id',
            new_name='pay_charge_id',
        ),
        migrations.RemoveField(
            model_name='day',
            name='order_delivery',
        ),
        migrations.RemoveField(
            model_name='day',
            name='order_pickup',
        ),
        migrations.RemoveField(
            model_name='inventory',
            name='parent',
        ),
        migrations.RemoveField(
            model_name='location',
            name='avatar',
        ),
        migrations.RemoveField(
            model_name='location',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='menus',
            name='outlet',
        ),
        migrations.RemoveField(
            model_name='modifier',
            name='outlet',
        ),
        migrations.RemoveField(
            model_name='order',
            name='outlet',
        ),
        migrations.RemoveField(
            model_name='order',
            name='restaurant',
        ),
        migrations.AlterField(
            model_name='modifier',
            name='max',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='modifier',
            name='min',
            field=models.IntegerField(default=0),
        ),
        migrations.DeleteModel(
            name='ApplicationSetting',
        ),
        migrations.DeleteModel(
            name='OrderDelivery',
        ),
        migrations.DeleteModel(
            name='OrderPickUp',
        ),
        migrations.DeleteModel(
            name='Restaurant',
        ),
        migrations.DeleteModel(
            name='RestaurantUser',
        ),
        migrations.AddField(
            model_name='branding',
            name='company',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='company_branding', to='restaurant.company'),
        ),
        migrations.AddField(
            model_name='branding',
            name='outlets',
            field=models.ManyToManyField(related_name='branding_location', to='restaurant.Location'),
        ),
        migrations.AddField(
            model_name='day',
            name='branding',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='branding_opening_day', to='restaurant.branding'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='menus',
            name='branding',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='branding_menu', to='restaurant.branding'),
        ),
        migrations.AddField(
            model_name='modifier',
            name='branding',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='branding_modifier', to='restaurant.branding'),
        ),
        migrations.AddField(
            model_name='order',
            name='branding',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='order', to='restaurant.branding'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='inventory',
            name='outlet',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='branding_inventory', to='restaurant.branding'),
        ),
        migrations.DeleteModel(
            name='Outlet',
        ),
    ]
