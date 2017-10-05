from django.conf.urls import url
from game import views

app_name = 'game'

urlpatterns = [
    url(r'^$', views.HomePage, name='home_page'),
    url(r'^(?P<game_id>[a-zA-Z0-9-_]+)/game/$', views.GamePage, name='game_page'),
]
