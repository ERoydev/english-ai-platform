from django.core.management.base import BaseCommand
from django.contrib.auth.models import Group, Permission
from django.contrib.contenttypes.models import ContentType

# class Command(BaseCommand):
#     help = 'Set up roles and permissions for the application'
#
#     def handle(self, *args, **kwargs):
#         # Create the "Superadmin" group with all permissions
#         superadmin_group, _ = Group.objects.get_or_create(name='Superadmin')
#         superadmin_group.permissions.set(Permission.objects.all())
#
#         # Create the "Staff" group with full CRUD on Question and limited auth permissions
#         staff_group, _ = Group.objects.get_or_create(name='Staff')
#         question_content_type = ContentType.objects.get_for_model(Question)
#         staff_permissions = Permission.objects.filter(content_type=question_content_type)
#         staff_group.permissions.set(staff_permissions)
#
#         # Create the "Manager" group with add/view permissions on Question
#         manager_group, _ = Group.objects.get_or_create(name='Manager')
#         manager_permissions = Permission.objects.filter(
#             content_type=question_content_type,
#             codename__in=['add_question', 'view_question']
#         )
#         manager_group.permissions.set(manager_permissions)
#
#         self.stdout.write(self.style.SUCCESS('Roles and permissions set up successfully.'))
