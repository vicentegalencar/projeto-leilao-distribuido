# Generated by Django 4.1 on 2023-04-11 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_leilao_itemid'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lance',
            name='usuario',
            field=models.CharField(max_length=100),
        ),
        migrations.AlterField(
            model_name='lance',
            name='valor',
            field=models.DecimalField(decimal_places=10, max_digits=50),
        ),
    ]
