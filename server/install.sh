#!/bin/env bash
virtualenv -p python3 env
source env/bin/activate
pip install django
pip install twitter
