# Generated by Django 4.1 on 2023-04-10 02:07

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Leilao',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('owner', models.CharField(max_length=100)),
                ('firstBid', models.DecimalField(decimal_places=2, max_digits=50)),
                ('actualBid', models.DecimalField(decimal_places=2, default=0, max_digits=50)),
                ('creation', models.DateTimeField(auto_now_add=True)),
                ('endTime', models.DateTimeField()),
                ('arrematante', models.CharField(default='', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Lance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usuario', models.CharField(max_length=50)),
                ('valor', models.DecimalField(decimal_places=2, max_digits=50)),
                ('horario_lance', models.DateTimeField(auto_now_add=True)),
                ('leilao', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='myapp.leilao')),
            ],
        ),
    ]
