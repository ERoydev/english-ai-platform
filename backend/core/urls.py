
from django.urls import path
from . import views
urlpatterns = [
    path('send_email/', views.EmailView.as_view(), name='send_email'),
    path('testimonials/', views.TestimonialsView.as_view(), name='testimonial'),

]