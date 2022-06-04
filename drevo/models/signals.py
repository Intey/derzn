import datetime

from django.core.mail import send_mail
from django.db.models.signals import post_save
from django.dispatch import receiver

from .knowledge import Znanie
from dz import settings


@receiver(post_save, sender=Znanie)
def notify(sender, instance, created, **kwargs):
    if instance.is_published:
        message_subject = 'Новое знание'
        message_content = 'Уважаемый {}{}!\n' \
                          f'{datetime.date.today()} было создано новое' \
                          f'знание:\n  {instance.get_absolute_url()}\n' \
                          f'Автор: {instance.author}\n'
        user_to_notify = instance.author.subscribers.all()
        for addressee in user_to_notify:
            patr = addressee.profile.patronymic or ''
            yield send_mail(message_subject, message_content.format(
                addressee.first_name, ' ' + patr),
                            f'Дерево знаний <{settings.EMAIL_HOST_USER}>',
                            addressee.email)
