from django.core.management.base import BaseCommand
from django.contrib.auth.models import Permission
from django.contrib.contenttypes.models import ContentType


"""
    DELETES Permissions that i don't need anymore
"""

class Command(BaseCommand):
    help = 'Remove stale permissions and content types'

    def handle(self, *args, **kwargs):
        stale_content_types = [
            ct for ct in ContentType.objects.all()
            if not ct.model_class()
        ]

        for ct in stale_content_types:
            # Delete permissions
            permissions = Permission.objects.filter(content_type=ct)
            self.stdout.write(f"Deleting permissions for {ct.app_label}.{ct.model}")
            permissions.delete()

            # Delete the stale content type
            self.stdout.write(f"Deleting content type: {ct.app_label}.{ct.model}")
            ct.delete()

        self.stdout.write(self.style.SUCCESS('Stale permissions and content types removed.'))
