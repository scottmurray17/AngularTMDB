import os
import json
import requests

API_KEY = os.environ.get('TMDB_KEY')
ALLOWED_ORIGINS = ['http://localhost:4200', 'https://scottmurray17.github.io']

def lambda_handler(event, context):
  try:
    if not event['headers']['origin'] in ALLOWED_ORIGINS: raise 'INVALID ORIGIN'

    title = event['queryStringParameters']['query']
    movieResults = requests.get(f'https://api.themoviedb.org/3/search/movie?api_key={API_KEY}&query={title}')
    tvResults = requests.get(f'https://api.themoviedb.org/3/search/tv?api_key={API_KEY}&query={title}')

    response = []
    if movieResults.status_code == 200: response = response + list(
      map(
        lambda movie: { 'id': movie['id'], 'name': movie['title'], 'poster_path': movie['poster_path'], 'media_type': 'movie' },
        movieResults.json()['results']
      )
    )[:5]
    if tvResults.status_code == 200: response = response + list(
      map(
        lambda show: { 'id': show['id'], 'name': show['name'], 'poster_path': show['poster_path'], 'media_type': 'show' },
        tvResults.json()['results']
      )
    )[:5]

    return {
      'statusCode': 200,
      'body': json.dumps(response),
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': event['headers']['origin'],
        "Access-Control-Allow-Methods": "GET"
      }
    }


  except Exception as e:
    print(e)
    return {
      'statusCode': 500,
      'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': event['headers']['origin'],
        "Access-Control-Allow-Methods": "GET"
      }
    }
