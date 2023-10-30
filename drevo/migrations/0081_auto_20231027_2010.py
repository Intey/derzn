# Generated by Django 3.2.4 on 2023-10-27 15:10

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('drevo', '0080_auto_20231016_1422'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='algorithmdata',
            name='work_name',
        ),
        migrations.AddField(
            model_name='znanie',
            name='several_works',
            field=models.BooleanField(default=False, verbose_name='Несколько работ'),
        ),
        migrations.AlterField(
            model_name='algorithmdata',
            name='element',
            field=models.CharField(max_length=255, verbose_name='Элемент'),
        ),
        migrations.CreateModel(
            name='AlgorithmWork',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('work_name', models.CharField(max_length=255, verbose_name='Работа')),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drevo.znanie', verbose_name='Алгоритм')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
            ],
            options={
                'verbose_name': 'Работа по алгоритму',
                'verbose_name_plural': 'Работы по алгоритмам',
            },
        ),
        migrations.CreateModel(
            name='AlgorithmAdditionalElements',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('element_name', models.CharField(max_length=255, verbose_name='Элемент')),
                ('relation_type', models.CharField(choices=[('necessary', 'Состав обязательный'), ('unnecessary', 'Состав желательный')], max_length=255, verbose_name='Вид связи')),
                ('insertion_type', models.BooleanField(default=False, verbose_name='По связи "Далее"?')),
                ('algorithm', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='changed_algorithm', to='drevo.znanie', verbose_name='Алгоритм')),
                ('parent_element', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='bz_element', to='drevo.znanie', verbose_name='Базовое знание')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL, verbose_name='Пользователь')),
                ('work', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='drevo.algorithmwork', verbose_name='Работа')),
            ],
            options={
                'verbose_name': 'Пользовательский элемент алгоритма',
                'verbose_name_plural': 'Пользовательские элементы алгоритмов',
            },
        ),
        migrations.AddField(
            model_name='algorithmdata',
            name='work',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='drevo.algorithmwork', verbose_name='Работа'),
        ),
    ]
