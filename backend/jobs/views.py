from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from rest_framework import status
import requests
from decouple import config

class GetJobs(GenericAPIView):
    def get(self, request):
        # Define the new URL for searching jobs
        # url = "https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=Javascript&locationId=92000000&datePosted=anyTime&onsiteRemote=remote&sort=mostRelevant"
        url = "https://linkedin-data-api.p.rapidapi.com/search-jobs?keywords=golang%20javascript%20python%20nodejs%20react&locationId=92000000&datePosted=anyTime&titleIds=9&onsiteRemote=remote&sort=mostRelevant"

        headers = {
            'x-rapidapi-host': 'linkedin-data-api.p.rapidapi.com',
            'x-rapidapi-key': config('RAPIDAPI_KEY')
        }

        # Make the GET request to the external API
        response = requests.get(url, headers=headers)

        # Check if the response was successful
        if response.status_code == 200:
            return Response(response.json(), status=status.HTTP_200_OK)
        else:
            return Response(response.json(), status=response.status_code)
