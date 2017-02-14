from django.conf import settings

from django.http import JsonResponse

from twitter import *

def index(request):
    twitter = Twitter(auth=OAuth2(bearer_token=settings.TWITTER_BEARER_TOKEN))

    response =  JsonResponse(twitter.statuses.user_timeline(screen_name="@MaplecroftRisk"), safe=False)
    response['Access-Control-Allow-Origin'] = "*"
    return response
