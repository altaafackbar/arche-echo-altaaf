from django.contrib import admin
from django.core.exceptions import ValidationError
from django.db.models import fields
from .models import CustomUser, Profile
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField
from django import forms
from django.contrib.auth.models import Group

# Register your models here.

class UserCreationForm(forms.ModelForm):

    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password Confirmation', widget=forms.PasswordInput)

    class Meta:
        model = CustomUser
        fields = ('email', 'first_name', 'last_name')

    def clean_password2(self):
        # Check that the two passwords matches
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super().save(commit=False)
        user.set_password(self.cleaned_data["password1"])
        if commit:
            user.save()

        return user

class UserChangeForm(forms.ModelForm):
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = CustomUser
        fields = fields = ('email', 'first_name', 'last_name')

class UserAdminConfig(BaseUserAdmin):
    form = UserChangeForm
    add_form = UserCreationForm

    ordering = ('-start_date',)
    search_fields = ('email',)
    list_display = ('email', 'first_name', 'last_name', 'is_active', 'is_admin')
    list_filter = ('last_name', 'is_admin')

    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name')}),
        ('Permissions', {'fields': ('is_active', 'is_admin')})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )

class ProfileAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)

admin.site.register(CustomUser, UserAdminConfig)
admin.site.unregister(Group)
admin.site.register(Profile, ProfileAdmin)