from django.urls import path, re_path
from . import views


urlpatterns = [
    path('general_tutorial4kids', views.general_tutorial4kids, name='general_tutorial4kids'),
    path('moteval_app', views.mot_app_task4kids, name='moteval_app'),
    path('ufov_app', views.ufov_task4kids, name='ufov_app'),
    path('memorability1_app', views.memorability1_task4kids, name='memorability1_app'),
    path('memorability2_app', views.memorability2_task4kids, name='memorability2_app'),
    path('workingmemory_app', views.workingmemory_task4kids, name='workingmemory_app'),
    path('cognitive_task4kids', views.cognitive_task4kids, name='cognitive_task4kids'),
    path('exit_view_cognitive_task4kids', views.exit_view_cognitive_task4kids, name='exit_cognitive_task4kids'),
    path('admin_change_screen_size', views.admin_change_screen_size, name='admin_change_screen_size'),
    path('admin_dashboard4kids', views.admin_dashboard4kids, name='admin_dashboard4kids'),
    path('admin_export', views.admin_export, name='admin_export'),
    path('admin_export_participant_csv', views.admin_export_participant_csv, name='admin_export_participant_csv'),
    path('admin_export/<str:task_name>', views.admin_export_task_csv, name='admin_export_task_csv'),

]