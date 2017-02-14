#!/bin/env bash
DIR="$( cd "$( dirname "$0" )" && pwd )"

source $DIR/env/bin/activate
trap 'kill %1' SIGINT
python $DIR/assesment_site/manage.py runserver localhost:8080
