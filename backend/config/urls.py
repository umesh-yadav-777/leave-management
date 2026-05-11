from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('api/leaves/', include('leaves.urls')),
    path('api/dashboard/', include('dashboard.urls')),
]
