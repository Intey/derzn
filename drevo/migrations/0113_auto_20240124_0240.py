# Generated by Django 3.2.4 on 2024-01-23 23:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('drevo', '0112_delete_suggestiontype'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='suggestiontype',
            options={'ordering': ('weight',), 'verbose_name': 'Вид предложения', 'verbose_name_plural': 'Виды предложений'},
        ),
        migrations.AlterModelOptions(
            name='turple',
            options={'ordering': ('weight',), 'verbose_name': 'Словарь', 'verbose_name_plural': 'Словари'},
        ),
        migrations.AlterModelOptions(
            name='turpleelement',
            options={'ordering': ('weight',), 'verbose_name': 'Элемент словаря', 'verbose_name_plural': 'Элементы словаря'},
        ),
        migrations.AlterModelOptions(
            name='var',
            options={'ordering': ('weight',), 'verbose_name': 'Объект', 'verbose_name_plural': 'Объекты шаблонов'},
        ),
    ]
