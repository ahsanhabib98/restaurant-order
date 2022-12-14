# Generated by Django 3.1.6 on 2021-05-21 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0007_auto_20210517_1937'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userprofile',
            old_name='amar_pay_customer_id',
            new_name='pay_customer_id',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_manager',
        ),
        migrations.RemoveField(
            model_name='user',
            name='is_owner',
        ),
        migrations.RemoveField(
            model_name='user',
            name='partner_name',
        ),
        migrations.RemoveField(
            model_name='user',
            name='select_brand',
        ),
        migrations.AlterField(
            model_name='user',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status'),
        ),
    ]
