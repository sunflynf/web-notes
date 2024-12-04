# Django

Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the "batteries-included" philosophy, meaning it comes with a lot of built-in features.

## Setting Up Your Environment

### Install Django

```bash
pip install django
```

### Create a Virtual Environment (Optional but Recommended)

```bash
python -m venv myenv
source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
```

## Creating a Django Project

### Start a New Project

```bash
django-admin startproject myproject
cd myproject
```

### Run the Development Server

```bash
python manage.py runserver
```

Visit `http://127.0.0.1:8000/` to see the default Django welcome page.

## Creating a Django App

### Start a New App

```bash
python manage.py startapp myapp
```

### Add the App to Your Project

Edit `myproject/settings.py` and add `'myapp'` to the `INSTALLED_APPS` list.

## Defining Models

### Create a Model

```py title="myapp/models.py"
from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
```

### Make and Apply Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

## Creating Views

### Create a View

```py title="myapp/views.py"
from django.shortcuts import render
from .models import Item

def index(request):
    items = Item.objects.all()
    return render(request, 'index.html', {'items': items})
```

### Map the View to a URL

```py title="myapp/urls.py"
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
]
```

Include the app's URLs in the project's URL configuration.

```py title="myproject/urls.py"
from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('myapp.urls')),
]
```

## Creating Templates

### Create a Template Directory

Create a directory named `templates` inside `myapp`.

### Create a Template File

Create `index.html` inside the `templates` directory:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Items</title>
  </head>
  <body>
    <h1>Items</h1>
    <ul>
      {% for item in items %}
      <li>{{ item.name }}: {{ item.description }}</li>
      {% endfor %}
    </ul>
  </body>
</html>
```

## Admin Interface

### Register the Model

```py title="myapp/admin.py"
from django.contrib import admin
from .models import Item

admin.site.register(Item)
```

### Create a Superuser

```bash
python manage.py createsuperuser
```

### Access the Admin Interface

Visit `http://127.0.0.1:8000/admin/` and log in with the superuser credentials.

## Static Files

### Create a Static Directory

Create a directory named `static` inside `myapp`.

### Add Static Files

Place your CSS, JavaScript, and images inside the `static` directory.

### Reference Static Files in Templates

```html
{% load static %}
<link rel="stylesheet" type="text/css" href="{% static 'myapp/style.css' %}" />
```

## Forms and Validation

### Create a Form

```py title="myapp/forms.py"
from django import forms
from .models import Item

class ItemForm(forms.ModelForm):
    class Meta:
        model = Item
        fields = ['name', 'description']
```

### Use the Form in a View

```py title="myapp/views.py"
from django.shortcuts import render, redirect
from .forms import ItemForm

def add_item(request):
    if request.method == 'POST':
        form = ItemForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')
    else:
        form = ItemForm()
    return render(request, 'add_item.html', {'form': form})
```

### Create a Template for the Form

Create `add_item.html` inside the `templates` directory:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Add Item</title>
  </head>
  <body>
    <h1>Add Item</h1>
    <form method="post">
      {% csrf_token %} {{ form.as_p }}
      <button type="submit">Save</button>
    </form>
  </body>
</html>
```

### Map the Form View to a URL

```py title="myapp/urls.py"
urlpatterns = [
    path('', views.index, name='index'),
    path('add/', views.add_item, name='add_item'),
]
```

## Deployment

### Prepare for Deployment

Make sure your `settings.py` is configured for production (e.g., `DEBUG = False`).

### Collect Static Files

```bash
python manage.py collectstatic
```

### Choose a Hosting Provider

Popular choices include Heroku, AWS, and DigitalOcean.

### Deploy Your Application

Follow the specific instructions for your chosen hosting provider.

## Resources

- **Django Documentation**: [https://docs.djangoproject.com/](https://docs.djangoproject.com/)
- **Django Tutorial**: [https://docs.djangoproject.com/en/stable/intro/tutorial01/](https://docs.djangoproject.com/en/stable/intro/tutorial01/)
