# Sprint 2 Release
## Frontend deployment

link TBC

## Backend deployment
### Backend has deployed on Cybera
private ipv4: 10.2.11.229

ipv6: 2605:fd00:4:1001:f816:3eff:fe5e:ba3b

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

Django migrate

```
python manage.py makemigrations
python manage.py migrate
```

Start Server

```
python manage.py runserver
```


## Documentation Endpoint
ipv4 (private): http://10.2.11.229/docs

ipv6: http://[2605:fd00:4:1001:f816:3eff:fe5e:ba3b]/docs


# ARCHE | ECHO App

## Deployment Website
https://ualberta-cmput401.github.io/arche-echo/requirements/

## Project Overview

This project involves developing an app for parents managing their child's acute illness. The ARCHE and ECHO groups have been co-developing parental health resources (i.e. KT tools such as interactive infographics, videos, and eBooks). These resources are played in healthcare setting across Canada including Alberta’s HUTV platform which results in exposure to almost a million viewers each month.

Our goal is to increase the accessibility and visibility of these tools to parents by housing them in a publicly available app. So far, we have been gathering and analyzing parents' preferences around health app content and features (e.g. a map of hospitals with ER wait times), and would like to translate this information into a working prototype.

The app will support two languages: English and French.
##
### Meeting Minutes can be found at our [Wiki](https://github.com/UAlberta-CMPUT401/arche-echo/wiki)

