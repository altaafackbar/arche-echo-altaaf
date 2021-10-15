## Installation 

Set up Python3 Virtual environment 

```
virtualenv venv
source venv/bin/active
```

Install required packages

```
pip install -r requirements.txt
```

#### IF you dont have postgresql installed, you can simply go to setting.py change database to default sqlite3 data for testing

```
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```
Django migrate

```
python manage.py makemigrations
python manage.py migrate
```

Start Server

```
python manage.py runserver
```


