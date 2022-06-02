from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from users.models import User, Profile, Favourite


class FavouritesInlined(admin.StackedInline):
    model = Favourite
    can_delete = False
    filter_horizontal = ('favourites', )


class ProfileInlined(admin.StackedInline):
    model = Profile
    can_delete = False


class UserAdmin(BaseUserAdmin):
    inlines = (ProfileInlined, FavouritesInlined)


admin.site.register(User, UserAdmin)
