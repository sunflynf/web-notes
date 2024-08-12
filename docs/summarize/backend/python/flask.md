---
description: Backend Frameworks in Python ecosystem.
tags:
   - Backend
   - Python
   - MVC
   - REST APIs
---

# Flask

## Installation

```bash
pip install Flask
```

## Basic Application Structure

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "Hello, Flask!"

if __name__ == '__main__':
    app.run(debug=True)
```

## Routing

```python
@app.route('/about')
def about():
    return "About Page"

@app.route('/user/<username>')
def show_user_profile(username):
    return f'User {username}'

@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post {post_id}'
```

## HTTP Methods

```python
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        return 'Login POST request'
    else:
        return 'Login GET request'
```

## Templates

- **Setup**
  - Create a folder named `templates` in your project directory.
  - Place HTML files in the `templates` folder.

- **Rendering Templates**

```python
from flask import render_template

@app.route('/hello/')
@app.route('/hello/<name>')
def hello(name=None):
    return render_template('hello.html', name=name)
```

- **Template Example**

```html title="templates/hello.html"
<!doctype html>
<html>
<head><title>Hello</title></head>
<body>
  <h1>Hello, {{ name }}!</h1>
</body>
</html>
```

## Static Files

- **Setup:**
  - Create a folder named `static` in your project directory.
  - Place static files (e.g., CSS, JavaScript, images) in the `static` folder.

- **Linking Static Files:**

```html
<link rel="stylesheet" type="text/css" href="{{ url_for('static', filename='style.css') }}">
```

## Forms and Request Data

```python
from flask import request

@app.route('/form-example', methods=['GET', 'POST'])
def form_example():
    if request.method == 'POST':
        name = request.form['name']
        return f'Hello, {name}!'
    return '''
        <form method="post">
            Name: <input type="text" name="name">
            <input type="submit">
        </form>
    '''
```

## Redirects and Errors

```python
from flask import redirect, url_for, abort

@app.route('/redirect-example')
def redirect_example():
    return redirect(url_for('home'))

@app.route('/error-example')
def error_example():
    abort(404)

@app.errorhandler(404)
def page_not_found(error):
    return 'This page does not exist', 404
```

## Sessions

```python
from flask import session

app.secret_key = 'supersecretkey'

@app.route('/set-session')
def set_session():
    session['username'] = 'admin'
    return 'Session set'

@app.route('/get-session')
def get_session():
    username = session.get('username')
    return f'Logged in as {username}'
```

## Database (Flask-SQLAlchemy)

- **Installation:**

```bash
pip install Flask-SQLAlchemy
```

- **Setup:**

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

db.create_all()
```

- **CRUD Operations:**

```python
# Create
new_user = User(username='admin', email='admin@example.com')
db.session.add(new_user)
db.session.commit()

# Read
user = User.query.filter_by(username='admin').first()

# Update
user.email = 'newemail@example.com'
db.session.commit()

# Delete
db.session.delete(user)
db.session.commit()
```

## Running the Application

```bash
export FLASK_APP=your_application.py
export FLASK_ENV=development
flask run
```

## Flask Extensions

- **Flask-WTF (Forms):**

```bash
pip install Flask-WTF
```

- **Flask-Login (User Session Management):**

```bash
pip install Flask-Login
```

- **Flask-Migrate (Database Migrations):**

```bash
pip install Flask-Migrate
```

## References

- [Flask documentation](https://flask.palletsprojects.com/).
