# Generated by Django 4.1 on 2023-04-10 18:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='leilao',
            name='itemID',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]
