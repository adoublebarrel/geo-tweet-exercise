#!/usr/bin/env bash

source server/env/bin/activate
trap 'kill %1' SIGINT
npm start --prefix client/ & python server/assesment_site/manage.py runserver localhost:8080
