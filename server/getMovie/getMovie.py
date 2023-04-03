import os
import json
import requests

API_KEY = os.environ.get('TMDB_KEY')
ALLOWED_ORIGINS = ['http://localhost:4200', 'https://scottmurray17.github.io']

def lambda_handler(event, context):
  try:
    print(event['headers'])
    if not event['headers']['origin'] in ALLOWED_ORIGINS: raise 'INVALID ORIGIN'

    movieId = event['pathParameters']['movieId']
    movieResponse = requests.get(f'https://api.themoviedb.org/3/movie/{movieId}?api_key={API_KEY}')

    return {
      'statusCode': movieResponse.status_code,
      'body': json.dumps(movieResponse.json()),
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
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        "Access-Control-Allow-Methods": "GET"
      }
    }

